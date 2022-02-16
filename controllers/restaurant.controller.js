const {
  Restaurant,
  ApproveRestaurant,
  CommentRestaurant,
  ApprovalWorkFlow,
  ApproveFlow,
  Sequelize,
} = require("../models");

const Op = Sequelize.Op;

exports.getWorkFlow = async (req, res) => {
  try {
    let results = await ApprovalWorkFlow.findAll();
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.saveWorkFlow = async (req, res) => {
  try {
    let results = await ApprovalWorkFlow.create({ action: req.body.action });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    let results = await Restaurant.findAll({
      offset: req.body.start,
      limit: 20,
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getSearchRestaurants = async (req, res) => {
  try {
    let results = await Restaurant.findAll({
      where: { restaurant_name: { [Op.like]: `%${req.body.searchItem}%` } },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.approveRestaurants = async (req, res) => {
  const { user_id, restaurant_id } = req.body;
  try {
    let checkUser = await ApproveRestaurant.findOne({
      where: { restaurant_id },
    });
    if (checkUser === null)
      await ApproveRestaurant.create({
        bm_id: null,
        manager_id: null,
        restaurant_id,
        date: null,
        is_approved: "-1",
      });
    const ch = await ApproveRestaurant.findOne({ where: { restaurant_id } });
    if (ch.is_approved === "-1") {
      await ApproveRestaurant.update(
        { bm_id: user_id, is_approved: "0", date: Date.now() },
        { where: { restaurant_id } }
      );
      await Restaurant.update(
        { is_approved: "0" },
        { where: { id: restaurant_id } }
      );
      let restaurant = await Restaurant.findOne({
        where: { id: restaurant_id },
      });
      return res.json({ result: "0", restaurant });
    } else if (ch.is_approved === "0") {
      await ApproveRestaurant.update(
        { is_approved: "1", manager_id: user_id },
        { where: { restaurant_id } }
      );
      await Restaurant.update(
        { is_approved: "1" },
        { where: { id: restaurant_id } }
      );
      let restaurant = await Restaurant.findOne({
        where: { id: restaurant_id },
      });
      return res.json({ result: "1", restaurant });
    } else if (ch?.is_approved == "1") {
      return res.json({ result: "done", restaurant_id });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.commentRestaurantMethod = async (req, res) => {
  const { comment, user_id, restaurant_id } = req.body;
  try {
    const result = await CommentRestaurant.create({
      comment,
      user_id,
      restaurant_id,
      date: Date.now(),
    });
    if (result.comment) return res.json("sent");
    else return res.json("sending failed");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.updateRestaurantRecord = async (req, res) => {
  try {
    let { id, ...others } = req.body;
    await Restaurant.update(others, {
      where: { id },
    });
    let response = await Restaurant.findOne({
      where: { id },
    });
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getAllRestaurantComment = async (req, res) => {
  try {
    let results = await CommentRestaurant.findAll(
      {
        offset: req.body.start,
        limit: 10,
      },
      { where: { restaurant_id: req.body.request_id } }
    );
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.preApprovalWorkFlow = async (req, res) => {
  const { user_id, request_id } = req.body;
  try {
    let checkUser = await ApprovalWorkFlow.findOne({
      where: { request_id },
    });
    if (checkUser === null)
      await ApprovalWorkFlow.create({
        user_id: null,
        action: null,
        request_id,
        date: null,
        pre_step: 0,
      });
    const ch = await ApprovalWorkFlow.findOne({ where: { request_id } });
    if (ch.pre_step == 0) {
      await ApprovalWorkFlow.update(
        {
          user_id: user_id,
          action: "call the applicant",
          pre_step: 1,
          date: Date.now(),
        },
        { where: { request_id } }
      );
      let request = await ApprovalWorkFlow.findOne({
        where: { request_id },
      });
      return res.json({ result: 1, request });
    } else if (ch.pre_step == 1) {
      await ApprovalWorkFlow.update(
        { pre_step: 2, action: "visit the restaurant" },
        { where: { request_id } }
      );
      let request = await ApprovalWorkFlow.findOne({
        where: { request },
      });
      return res.json({ result: 2, request });
    } else if (ch?.pre_step == 2) {
      await ApprovalWorkFlow.update(
        { pre_step: 3, action: "meet with restaurant owner" },
        { where: { request_id } }
      );
      let request = await ApprovalWorkFlow.findOne({
        where: { request },
      });
      return res.json({ result: 3, request });
    } else if (ch?.pre_step == 3) {
      await ApprovalWorkFlow.update(
        { pre_step: 4, action: "sign agreement" },
        { where: { request_id } }
      );
      let request = await ApprovalWorkFlow.findOne({
        where: { request },
      });
      return res.json({ result: 4, request });
    } else if (ch?.pre_step == 4) {
      await ApprovalWorkFlow.update(
        { pre_step: 5, action: "approve disbursement" },
        { where: { request_id } }
      );
      let request = await ApprovalWorkFlow.findOne({
        where: { request },
      });
      return res.json({ result: 5, request });
    } else {
      return res.json({ result: "nothing to update" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getAllFlowRestaurantFlow = async (req, res) => {
  try {
    let results = await ApproveFlow.findAll({
      where: { category: req.body.category },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
