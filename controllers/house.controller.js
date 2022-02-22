const {
  ListHouse,
  ApproveHouse,
  CommentHouse,
  ApproveFlow,
  // ApprovalWorkFlowHouse,
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
    const checkHouse = await ListHouse.findOne({
      where: { id: request_id },
    });

    if (ch.length == 0) {
      try {
        await ApprovalWorkFlowHouse.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: 1,
          date: Date.now(),
        });
        await ListHouse.update({ step: 1 }, { where: { id: request_id } });
        let request2 = await ListHouse.findOne({
          where: { id: request_id },
        });

        return res.json({ house: request2, message: "updated" });
      } catch (error) {
        return res.json({ error });
      }
    } else if (
      ch[ch.length - 1].pre_step < checker.length &&
      checkHouse?.is_approved !== 1
    ) {
      try {
        await ApprovalWorkFlowHouse.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: ch[ch.length - 1].pre_step + 1,
          date: Date.now(),
        });
        await ListHouse.update(
          { step: ch[ch.length - 1].pre_step + 1 },
          { where: { id: request_id } }
        );
        const checkEnd = await ApprovalWorkFlowHouse.findAll({
          where: { request_id },
        });
        if (checkEnd[checkEnd.length - 1].pre_step === checker.length) {
          await ListHouse.update(
            { is_approved: 1 },
            { where: { id: request_id } }
          );
        }

        let request2 = await ListHouse.findOne({
          where: { id: request_id },
        });

        return res.json({
          house: request2,
          message: "updated",
        });
      } catch (error) {
        return res.json({ error });
      }
    } else {
      return res.json({ message: "nothing to update" });
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

exports.getAllHouseComment = async (req, res) => {
  try {
    let results = await CommentHouse.findAll(
      {
        offset: req.body.start,
        limit: 10,
      },
      { where: { house_id: req.body.request_id } }
    );
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

exports.getSummaryOfRequestStageHouse = async (req, res) => {
  try {
    let val = await ListHouse.findAll({
      group: ["step"],
      attributes: [
        ["step", "stage"],
        [Sequelize.fn("COUNT", "step"), "count"],
      ],
      order: [[Sequelize.literal("count"), "DESC"]],
      raw: true,
    });

    let flow = await ApproveFlow.findAll({
      where: { category: "teacher" },
    });

    for (let i = 1; i < flow.length; i++) {
      let verify = val.find((element) => {
        return element.stage == i;
      });

      if (!verify) {
        val.push({
          stage: i,
          count: 0,
        });
      }
    }

    return res.json(val);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};
