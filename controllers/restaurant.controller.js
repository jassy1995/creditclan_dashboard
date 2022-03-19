const {
  Restaurant,
  ApproveRestaurant,
  CommentRestaurant,
  ApprovalWorkFlow,
  ApproveFlow,
  CrawlingRecord,
  Agent,
  Sequelize,
} = require("../models");
const axios = require("axios");

const Op = Sequelize.Op;

exports.getWorkFlow = async (req, res) => {
  try {
    let results = await ApprovalWorkFlow.findAll();
    return res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.saveWorkFlow = async (req, res) => {
  try {
    let results = await ApprovalWorkFlow.create({ action: req.body.action });
    return res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const results = await Restaurant.findAll({
      order: [["created_at", "DESC"]],
      where: { is_declined: 0 },
      offset: req.body.start,
      limit: 20,
      include: [
        {
          model: Agent,
          required: false,
        },
      ],
    });

    return res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getSearchRestaurants = async (req, res) => {
  try {
    let results = await Restaurant.findAll({
      where: {
        restaurant_name: { [Op.like]: `%${req.body.searchItem}%` },
        is_declined: 0,
      },
      include: [
        {
          model: Agent,
          required: false,
        },
      ],
    });
    return res.json(results);
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
    if (result.comment) {
      return res.json({ message: "sent", data: result });
    } else return res.json({ message: "sending failed", data: null });
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
    try {
      let results = await CommentRestaurant.findAll({
        offset: req.body.start,
        limit: 10,

        where: { restaurant_id: req.body.request_id },
      });
      return res.json(results);
    } catch (error) {
      return res.status(500).json({ error, message: "error occur" });
    }
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.preApprovalWorkFlowRestaurant = async (req, res) => {
  const { user_id, request_id, action, category } = req.body;
  try {
    const checker = await ApproveFlow.findAll({ where: { category } });
    const ch = await ApprovalWorkFlow.findAll({ where: { request_id } });
    const checkRestaurant = await Restaurant.findOne({
      where: { id: request_id },
    });

    if (ch.length == 0 && checker.length !== 0) {
      try {
        await ApprovalWorkFlow.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: 1,
          date: Date.now(),
        });
        await Restaurant.update({ step: 1 }, { where: { id: request_id } });
        let request2 = await Restaurant.findOne({
          where: { id: request_id },
        });

        return res.json({ restaurant: request2, message: "updated" });
      } catch (error) {
        console.log(error);
        return res.json({ error });
      }
    } else if (
      ch[ch.length - 1].pre_step < checker.length &&
      checkRestaurant?.is_approved !== 1
    ) {
      try {
        await ApprovalWorkFlow.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: ch[ch.length - 1].pre_step + 1,
          date: Date.now(),
        });

        await Restaurant.update(
          { step: ch[ch.length - 1].pre_step + 1 },
          { where: { id: request_id } }
        );

        const checkEnd = await ApprovalWorkFlow.findAll({
          where: { request_id },
        });
        if (checkEnd[checkEnd.length - 1].pre_step === checker.length) {
          await Restaurant.update(
            { is_approved: 1 },
            { where: { id: request_id } }
          );
        }
        let request2 = await Restaurant.findOne({
          where: { id: request_id },
        });
        return res.json({
          restaurant: request2,
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

exports.rejectRequest = async (req, res) => {
  const { user_id, request_id } = req.body;
  await Restaurant.update(
    { is_approved: -1, is_declined: 1 },
    { where: { id: request_id } }
  );
  await ApprovalWorkFlow.create({
    user_id,
    action: "reject request",
    request_id,
    pre_step: 0,
    date: Date.now(),
  });
  const rejectedRequest = await Restaurant.findOne({
    where: { id: request_id },
  });
  return res.json({ request: rejectedRequest, message: "rejected" });
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
    let val = await Restaurant.findAll({
      group: ["step"],
      attributes: [
        ["step", "stage"],
        [Sequelize.fn("COUNT", "step"), "count"],
      ],
      order: [[Sequelize.literal("count"), "DESC"]],
      raw: true,
    });

    let flow = await ApproveFlow.findAll({
      where: { category: "restaurant" },
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

exports.SearchByStep = async (req, res) => {
  try {
    const result = await Restaurant.findAll({
      where: { step: req.body.stage },
      include: [
        {
          model: Agent,
          required: false,
        },
      ],
      offset: req.body.start,
      limit: 20,
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
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

// CrawlingRecord;
exports.CrawlingRecordMonitor = async (req, res) => {
  try {
    const result = await CrawlingRecord.create({
      user_id: req.body.user_id,
      date: Date.now(),
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};
