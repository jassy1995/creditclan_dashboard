const {
  Restaurant,
  ApproveRestaurant,
  CommentRestaurant,
  Sequelize,
} = require("../models");

const Op = Sequelize.Op;

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
