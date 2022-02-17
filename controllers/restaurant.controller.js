const {
  Restaurant,
  ApproveRestaurant,
  CommentRestaurant,
  ApprovalWorkFlow,
  ApproveFlow,
  Sequelize,
} = require("../models");
const axios = require("axios");

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
  const { user_id, request_id, action } = req.body;
  try {
    // let checkUser = await ApprovalWorkFlow.findOne({
    //   where: { request_id },
    // });
    // if (checkUser === null)
    //   await ApprovalWorkFlow.create({
    //     user_id: null,
    //     action: null,
    //     request_id,
    //     date: null,
    //     pre_step: 0,
    //   });
    const ch = await ApprovalWorkFlow.findAll({ where: { request_id } });
    console.log(ch?.pre_step);
    if (action == "call the applicant" && ch.length == 0) {
      await ApprovalWorkFlow.create({
        user_id: user_id,
        action: action,
        request_id,
        pre_step: 0,
        date: Date.now(),
      });
      let request = await ApprovalWorkFlow.findOne({
        where: { request_id },
      });
      return res.json({ request, message: "updated" });
    } else if (
      action == "visit the restaurant" &&
      ch[ch.length - 1].pre_step == 0
    ) {
      await ApprovalWorkFlow.create({
        user_id: user_id,
        action: action,
        request_id,
        pre_step: 1,
        date: Date.now(),
      });
      let request = await ApprovalWorkFlow.findAll({
        where: { request_id },
      });
      return res.json({
        request: request[request.length - 1],
        message: "updated",
      });
    } else if (
      action == "meet with restaurant owner" &&
      ch[ch.length - 1].pre_step == 1
    ) {
      await ApprovalWorkFlow.create({
        user_id: user_id,
        action: action,
        request_id,
        pre_step: 2,
        date: Date.now(),
      });
      let request = await ApprovalWorkFlow.findAll({
        where: { request_id },
      });
      return res.json({
        request: request[request.length - 1],
        message: "updated",
      });
    } else if (action == "sign agreement" && ch[ch.length - 1].pre_step == 2) {
      await ApprovalWorkFlow.create({
        user_id: user_id,
        action: action,
        request_id,
        pre_step: 3,
        date: Date.now(),
      });
      let request = await ApprovalWorkFlow.findAll({
        where: { request_id },
      });
      return res.json({
        request: request[request.length - 1],
        message: "updated",
      });
    } else if (
      action == "approve disbursement" &&
      ch[ch.length - 1].pre_step == 3
    ) {
      await ApprovalWorkFlow.create({
        user_id: user_id,
        action: action,
        request_id,
        pre_step: 4,
        date: Date.now(),
      });
      let request = await ApprovalWorkFlow.findAll({
        where: { request_id },
      });
      return res.json({
        request: request[request.length - 1],
        message: "updated",
      });
    } else {
      return res.json({ message: "nothing to update" });
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

exports.getInitialValue = async (req, res) => {
  try {
    let results = await ApprovalWorkFlow.findAll({
      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getSummaryOfRequestStage = async (req, res) => {
  try {
    // let all_restaurant = await Restaurant.findAll({
    //   where: { id: request.id },
    // });
    // let call_applicant = await ApprovalWorkFlow.findAll({
    //   where: { action: "call the applicant" },
    // });
    // let visit_restaurant = await ApprovalWorkFlow.findAll({
    //   where: { action: "visit the restaurant" },
    // });
    // let meet_restaurant_owner = await ApprovalWorkFlow.findAll({
    //   where: { action: "meet with restaurant owner" },
    // });
    // let sign_agreement = await ApprovalWorkFlow.findAll({
    //   where: { action: "sign agreement" },
    // });
    // let sign_agreement = await ApprovalWorkFlow.findAll({
    //   where: { action: "approve disbursement" },
    // });
    // let val = await ApprovalWorkFlow.findAll({
    //   attributes: [
    //     "ApprovalWorkFlow.action",
    //     [
    //       sequelize.fn("COUNT", sequelize.col("ApprovalWorkFlow.id")),
    //       "CountPerRequest",
    //     ],
    //   ],
    //   include: [
    //     {
    //       model: ApprovalWorkFlow,
    //       attributes: [],
    //       include: [],
    //     },
    //   ],
    //   group: ["ApprovalWorkFlow.pre_step"],
    //   raw: true,
    // });

    // let val = await ApprovalWorkFlow.findAll({
    //   attributes: {
    //     include: [
    //       [sequelize.fn("COUNT", sequelize.col("pre_step")), "totalPrice"],
    //     ],
    //   },
    // });

    // let val = await ApprovalWorkFlow.findAll({
    //   group: ["pre_step"],
    //   attributes: [
    //     "pre_step",
    //     "action",
    //     [Sequelize.fn("COUNT", "pre_step"), "count"],
    //   ],
    //   order: [[Sequelize.literal("count"), "DESC"]],
    //   raw: true,
    // });

    let array = [];
    let allResults = axios
      .get("https://whatsapp.creditclan.com/rent/api/restaurant-detail", {
        start: 0,
      })
      .then((response) => {
        return response;
      });

    for (let index = 0; index < allResults.length; index++) {
      let arr = await ApprovalWorkFlow.findAll({
        where: { request_id: allResults[index].id },
      });

      if (arr.length > 0) {
        array.push(arr[arr.length - 1]);
      } else {
        array.push({ step: 0, action: "call the applicant" });
      }
    }
    console.log(array);

    // let groups = array.reduce((groups, param) => {
    //   const data = param.action;
    //   if (!groups[data]) {
    //     groups[data] = [];
    //   }
    //   groups[data].push(param);
    //   return groups;
    // }, {});
    // const groupArrays = Object.keys(groups).map((data) => {
    //   return {
    //     data,
    //     games: groups[data],
    //   };
    // });

    // let val = await ApprovalWorkFlow.findAll({
    //   where: {
    //     category: req.body.category,
    //   },
    // });

    return res.json(allResults).length;
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
