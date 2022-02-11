const {
  ListHouse,
  ApproveHouse,
  CommentHouse,
  Sequelize,
} = require("../models");
const Op = Sequelize.Op;

exports.getAllHouse = async (req, res) => {
  try {
    let results = await ListHouse.findAll({
      offset: req.body.start,
      limit: 20,
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getSearchHouse = async (req, res) => {
  try {
    let results = await ListHouse.findAll({
      where: { address: { [Op.like]: `%${req.body.searchItem}%` } },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.approveHouse = async (req, res) => {
  const { user_id, house_id } = req.body;
  try {
    let checkUser = await ApproveHouse.findOne({
      where: { house_id },
    });
    if (checkUser === null)
      await ApproveHouse.create({
        bm_id: null,
        manager_id: null,
        house_id,
        date: null,
        is_approved: "-1",
      });
    const ch = await ApproveHouse.findOne({ where: { house_id } });
    if (ch.is_approved == "-1") {
      await ApproveHouse.update(
        { bm_id: user_id, is_approved: "0", date: Date.now() },
        +{ where: { house_id } }
      );
      await ListHouse.update({ is_approved: "0" }, { where: { id: house_id } });
      let house = await ListHouse.findOne({
        where: { id: house_id },
      });
      return res.json({ result: "0", house });
    } else if (ch.is_approved == "0") {
      await ApproveHouse.update(
        { is_approved: "1", manager_id: user_id },
        { where: { house_id } }
      );
      await ListHouse.update({ is_approved: "1" }, { where: { id: house_id } });
      let house = await ListHouse.findOne({
        where: { id: house_id },
      });
      return res.json({ result: "1", house });
    } else if (ch?.is_approved == "1") {
      return res.json({ result: "done", house_id });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.commentHouseMethod = async (req, res) => {
  const { comment, user_id, house_id } = req.body;
  try {
    const result = await CommentHouse.create({
      comment,
      user_id,
      house_id,
      date: Date.now(),
    });
    if (result.comment) return res.json("sent");
    else return res.json("sending failed");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.updateHouseRecord = async (req, res) => {
  try {
    let { id, ...others } = req.body;
    await ListHouse.update(others, {
      where: { id },
    });
    let response = await ListHouse.findOne({
      where: { id },
    });
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
