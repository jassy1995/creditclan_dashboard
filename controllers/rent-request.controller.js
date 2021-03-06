const axios = require("axios");
const {
  CommentRequest,
  ApprovalWorkFlowRent,
  ApproveFlow,
} = require("../models");

exports.rentRequestComment = async (req, res) => {
  const { comment, user_id, request_id } = req.body;
  try {
    const result = await CommentRequest.create({
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

exports.getAllRentComment = async (req, res) => {
  try {
    let results = await CommentRequest.findAll({
      offset: req.body.start,
      limit: 10,

      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.preApprovalWorkFlowRent = async (req, res) => {
  const { user_id, request_id, action, category } = req.body;
  try {
    const checker = await ApproveFlow.findAll({ where: { category } });
    const ch = await ApprovalWorkFlowRent.findAll({ where: { request_id } });
    const { data } = await axios.post(
      "https://wema.creditclan.com/api/v3/rent/rentrequest",
      { rent_id: request_id }
    );

    if (ch.length == 0 && checker.length !== 0) {
      try {
        await ApprovalWorkFlowRent.create({
          user_id,
          action,
          request_id,
          pre_step: 1,
          date: Date.now(),
        });
        const updatedOne = await axios.post(
          "https://wema.creditclan.com/api/v3/rent/update_request_step",
          {
            rent_id: request_id,
            step: 1,
          }
        );

        return res.json({
          response: updatedOne.data?.request,
          message: "updated",
        });
      } catch (error) {
        return res.json({ error });
      }
    } else if (
      ch[ch.length - 1].pre_step < checker.length &&
      Number(data.request?.is_approved) !== 1
    ) {
      try {
        await ApprovalWorkFlowRent.create({
          user_id,
          action,
          request_id,
          pre_step: ch[ch.length - 1].pre_step + 1,
          date: Date.now(),
        });
        await axios.post(
          "https://wema.creditclan.com/api/v3/rent/update_request_step",
          {
            rent_id: request_id,
            step: ch[ch.length - 1].pre_step + 1,
          }
        );
        const checkEnd = await ApprovalWorkFlowRent.findAll({
          where: { request_id },
        });
        if (checkEnd[checkEnd.length - 1].pre_step === checker.length) {
          await axios.post(
            "https://wema.creditclan.com/api/v3/rent/final_approve_rent",
            { user_id, request_id }
          );
        }

        const values = await axios.post(
          "https://wema.creditclan.com/api/v3/rent/rentrequest",
          { rent_id: request_id }
        );
        return res.json({
          response: values.data.request,
          message: "updated",
        });
      } catch (error) {
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

exports.getEachRequestFlow = async (req, res) => {
  try {
    let results = await ApprovalWorkFlowRent.findAll({
      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
