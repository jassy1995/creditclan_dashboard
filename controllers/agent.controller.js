const axios = require("axios");
const {
  ApprovalWorkFlowAgent,
  ApproveFlow,
  CommentAgent,
} = require("../models");

exports.preApprovalWorkFlowAgent = async (req, res) => {
  const { user_id, request_id, action, category } = req.body;
  try {
    const checker = await ApproveFlow.findAll({ where: { category } });
    const ch = await ApprovalWorkFlowAgent.findAll({ where: { request_id } });
    const { data } = await axios.get(
      `https://sellbackend.creditclan.com/parent/index.php/rent/get_agents/${request_id}`
    );

    if (
      ch.length == 0 &&
      checker.length !== 0 &&
      Number(data?.data?.is_approved) !== 1
    ) {
      try {
        await ApprovalWorkFlowAgent.create({
          user_id,
          action,
          request_id,
          pre_step: 1,
          date: Date.now(),
        });

        await axios.post(
          "https://sellbackend.creditclan.com/parent/index.php/rent/approve_agent",
          {
            agent_id: request_id,
            step: 1,
            is_approve: "",
          }
        );
        const checkEnd = await ApprovalWorkFlowAgent.findAll({
          where: { request_id },
        });
        if (checkEnd[checkEnd.length - 1].pre_step === checker.length) {
          await axios.post(
            "https://sellbackend.creditclan.com/parent/index.php/rent/approve_agent",
            {
              agent_id: request_id,
              step: "",
              is_approve: 1,
            }
          );
        }
        const val = await axios.get(
          `https://sellbackend.creditclan.com/parent/index.php/rent/get_agents/${request_id}`
        );
        return res.json({
          response: val?.data?.data,
          message: "updated",
        });
      } catch (error) {
        return res.json({ error });
      }
    } else if (
      ch[ch.length - 1].pre_step < checker.length &&
      Number(data?.data?.is_approved) !== 1
    ) {
      try {
        await ApprovalWorkFlowAgent.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: ch[ch.length - 1].pre_step + 1,
          date: Date.now(),
        });
        await axios.post(
          "https://sellbackend.creditclan.com/parent/index.php/rent/approve_agent",
          {
            agent_id: request_id,
            step: ch[ch.length - 1].pre_step + 1,
            is_approve: "",
          }
        );
        const checkEnd = await ApprovalWorkFlowAgent.findAll({
          where: { request_id },
        });
        if (checkEnd[checkEnd.length - 1].pre_step === checker.length) {
          await axios.post(
            "https://sellbackend.creditclan.com/parent/index.php/rent/approve_agent",
            {
              agent_id: request_id,
              step: "",
              is_approve: 1,
            }
          );
        }
        const checkAgent2 = await axios.get(
          `https://sellbackend.creditclan.com/parent/index.php/rent/get_agents/${request_id}`
        );
        return res.json({
          response: checkAgent2?.data?.data,
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
    let results = await ApprovalWorkFlowAgent.findAll({
      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.InsertFlow = async (req, res) => {
  try {
    const { action, fulfillment, owner, priority, category } = req.body;
    const result = await ApproveFlow.create({
      action,
      fulfillment,
      owner,
      priority,
      category,
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

exports.agentComment = async (req, res) => {
  const { comment, user_id, request_id } = req.body;
  try {
    const result = await CommentAgent.create({
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

exports.getAgentComment = async (req, res) => {
  try {
    let results = await CommentAgent.findAll({
      offset: req.body.start,
      limit: 10,
      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
