const axios = require("axios");
const {
  ListHouse,
  CommentHouse,
  ApproveFlow,
  ApprovalWorkFlowHouse,
  Sequelize,
} = require("../models");
const Op = Sequelize.Op;

exports.getAllHouse = async (req, res) => {
  try {
    let results = await ListHouse.findAll({
      offset: req.body.start,
      limit: 20,
    });

    const sorted = results.sort((a, b) =>
      new Date(a.date_added) > new Date(b.date_added)
        ? -1
        : new Date(a.date_added) < new Date(b.date_added)
        ? 1
        : 0
    );
    return res.json(sorted);
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
  const { user_id, request_id, action, category } = req.body;
  try {
    const checker = await ApproveFlow.findAll({ where: { category } });
    const ch = await ApprovalWorkFlowHouse.findAll({
      where: { request_id },
    });

    const checkHouse = await axios.get(
      `https://sellbackend.creditclan.com/parent/index.php/rent/get_list/${request_id}`
    );

    if (ch.length == 0 && checker.length !== 0) {
      try {
        await ApprovalWorkFlowHouse.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: 1,
          date: Date.now(),
        });
        const request2 = await axios.post(
          "https://sellbackend.creditclan.com/parent/index.php/rent/approve_rent",
          {
            list_id: request_id,
            step: 1,
            is_approve: "",
          }
        );

        return res.json({
          response: request2.data.data,
          message: "updated",
        });
      } catch (error) {
        console.log(error);
        return res.json({ error });
      }
    } else if (
      ch[ch.length - 1].pre_step < checker.length &&
      checkHouse.data.data?.is_approved !== 1
    ) {
      try {
        await ApprovalWorkFlowHouse.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: ch[ch.length - 1].pre_step + 1,
          date: Date.now(),
        });
        await axios.post(
          "https://sellbackend.creditclan.com/parent/index.php/rent/approve_rent",
          {
            list_id: request_id,
            step: ch[ch.length - 1].pre_step + 1,
            is_approve: "",
          }
        );
        const checkEnd = await ApprovalWorkFlowHouse.findAll({
          where: { request_id },
        });
        if (checkEnd[checkEnd.length - 1].pre_step === checker.length) {
          await axios.post(
            "https://sellbackend.creditclan.com/parent/index.php/rent/approve_rent",
            {
              list_id: request_id,
              step: "",
              is_approve: 1,
            }
          );
        }

        const checkHouse2 = await axios.get(
          `https://sellbackend.creditclan.com/parent/index.php/rent/get_list/${request_id}`
        );

        return res.json({
          response: checkHouse2.data.data,
          message: "updated",
        });
      } catch (error) {
        console.log(error);
        return res.json({ error });
      }
    } else {
      return res.json({ message: "nothing to approve!" });
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
    if (result.comment) {
      return res.json({ message: "sent", data: result });
    } else return res.json({ message: "sending failed", data: null });
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

exports.getAllHouseComment = async (req, res) => {
  try {
    let results = await CommentHouse.findAll({
      offset: req.body.start,
      limit: 10,

      where: { house_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getEachRequestFlow = async (req, res) => {
  try {
    let results = await ApprovalWorkFlowHouse.findAll({
      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
