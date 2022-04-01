const {
  Merchant,
  CommentMerchant,
  ApprovalWorkFlowMerchant,
  ApproveFlow,
  Op,

  Sequelize,
} = require("../models");

exports.getAllMerchants = async (req, res) => {
  try {
    const results = await Merchant.findAll({
      order: [["created_at", "DESC"]],
      where: { is_approved: { [Op.ne]: -1 } },
      offset: req.body.start,
      limit: 20,
    });

    return res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.SearchByStep = async (req, res) => {
  try {
    const result = await Merchant.findAll({
      where: { step: req.body.stage },
      offset: req.body.start,
      limit: 20,
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

exports.getSummaryOfRequestStage = async (req, res) => {
  try {
    let val = await Merchant.findAll({
      group: ["step"],
      attributes: [
        ["step", "stage"],
        [Sequelize.fn("COUNT", "step"), "count"],
      ],
      order: [[Sequelize.literal("count"), "DESC"]],
      raw: true,
    });

    let flow = await ApproveFlow.findAll({
      where: { category: "merchant" },
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
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getProgress = async (req, res) => {
  try {
    let results = await ApprovalWorkFlowMerchant.findAll({
      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.rejectRequest = async (req, res) => {
  const { user_id, request_id } = req.body;
  await Merchant.update({ is_approved: -1 }, { where: { id: request_id } });
  await ApprovalWorkFlowMerchant.create({
    user_id,
    action: "reject request",
    request_id,
    pre_step: 0,
    date: Date.now(),
  });
  const rejectedRequest = await Merchant.findOne({
    where: { id: request_id },
  });
  return res.json({ request: rejectedRequest, message: "rejected" });
};

exports.getSearchMerchant = async (req, res) => {
  try {
    let results = await Merchant.findAll({
      where: {
        name: { [Op.like]: `%${req.body.searchItem}%` },
      },
    });
    return res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.updateMerchantRecord = async (req, res) => {
  try {
    let { id, ...others } = req.body;
    await Merchant.update(others, {
      where: { id },
    });
    let response = await Merchant.findOne({
      where: { id },
    });
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.preApprovalWorkFlowMerchant = async (req, res) => {
  const { user_id, request_id, action, category } = req.body;
  try {
    const checker = await ApproveFlow.findAll({ where: { category } });
    const ch = await ApprovalWorkFlowMerchant.findAll({
      where: { request_id },
    });
    const checkMerchant = await Merchant.findOne({
      where: { id: request_id },
    });

    if (ch.length == 0 && checker.length !== 0) {
      try {
        await ApprovalWorkFlowMerchant.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: 1,
          date: Date.now(),
        });
        await Merchant.update({ step: 1 }, { where: { id: request_id } });
        let request2 = await Merchant.findOne({
          where: { id: request_id },
        });

        return res.json({ merchant: request2, message: "updated" });
      } catch (error) {
        console.log(error);
        return res.json({ error });
      }
    } else if (
      ch[ch.length - 1].pre_step < checker.length &&
      checkMerchant?.is_approved !== 1
    ) {
      try {
        await ApprovalWorkFlowMerchant.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: ch[ch.length - 1].pre_step + 1,
          date: Date.now(),
        });

        await Merchant.update(
          { step: ch[ch.length - 1].pre_step + 1 },
          { where: { id: request_id } }
        );

        const checkEnd = await ApprovalWorkFlowMerchant.findAll({
          where: { request_id },
        });
        if (checkEnd[checkEnd.length - 1].pre_step === checker.length) {
          let compareNum = false;
          let generatedCode = Math.floor(1000 + Math.random() * 9000);
          if (checkMerchant.code === null) {
            compareNum = true;
            // generatedCode = Math.floor(1000 + Math.random() * 9000);
            // compareNum = true;
          }
          await Merchant.update(
            {
              is_approved: 1,
              code: compareNum ? "M" + generatedCode : "",
            },

            { where: { id: request_id } }
          );
        }
        let request2 = await Merchant.findOne({
          where: { id: request_id },
        });
        return res.json({
          merchant: request2,
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

exports.commentMerchantMethod = async (req, res) => {
  const { comment, user_id, request_id } = req.body;
  try {
    const result = await CommentMerchant.create({
      comment,
      user_id,
      request_id,
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

exports.getComment = async (req, res) => {
  try {
    try {
      let results = await CommentMerchant.findAll({
        offset: req.body.start,
        limit: 10,

        where: { request_id: req.body.request_id },
      });
      return res.json(results);
    } catch (error) {
      return res.status(500).json({ error, message: "error occur" });
    }
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
