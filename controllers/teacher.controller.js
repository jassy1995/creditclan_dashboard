const axios = require("axios");
const {
  CommentTeacherLoan,
  ApprovalWorkFlowTeacher,
  ApproveFlow,
  Teacher,
} = require("../models");
exports.teacherLoanComment = async (req, res) => {
  const { comment, user_id, request_id } = req.body;
  try {
    const result = await CommentTeacherLoan.create({
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

exports.getTeacherComment = async (req, res) => {
  try {
    let results = await CommentTeacherLoan.findAll({
      offset: req.body.start,
      limit: 10,

      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getAllTeachersLoan = async (req, res) => {
  try {
    let results = await Teacher.findAll({
      offset: req.body.start,
      limit: 20,
    });

    const sorted = results.sort((a, b) =>
      new Date(a.created_at) > new Date(b.created_at)
        ? -1
        : new Date(a.created_at) < new Date(b.created_at)
        ? 1
        : 0
    );

    return res.json(sorted);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.preApprovalWorkFlowTeacher = async (req, res) => {
  const { user_id, request_id, action, category } = req.body;
  try {
    const checker = await ApproveFlow.findAll({ where: { category } });
    const ch = await ApprovalWorkFlowTeacher.findAll({ where: { request_id } });
    const checkTeacher = await axios.post(
      "https://sellbackend.creditclan.com/parent/index.php/parents/request_teacher",
      { request_id }
    );

    if (ch.length == 0 && checker.length !== 0) {
      try {
        await ApprovalWorkFlowTeacher.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: 1,
          date: Date.now(),
        });

        const updatedOne = await axios.post(
          "https://sellbackend.creditclan.com/parent/index.php/parents/teacher_approval",
          {
            request_id: request_id,
            step: 1,
            is_approved: "",
          }
        );

        return res.json({
          response: updatedOne.data.request,
          message: "updated",
        });
      } catch (error) {
        return res.json({ error });
      }
    } else if (
      ch[ch.length - 1].pre_step < checker.length &&
      Number(checkTeacher.data.request.is_approved) !== 1
    ) {
      try {
        await ApprovalWorkFlowTeacher.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: ch[ch.length - 1].pre_step + 1,
          date: Date.now(),
        });
        await axios.post(
          "https://sellbackend.creditclan.com/parent/index.php/parents/teacher_approval",
          {
            request_id: request_id,
            step: ch[ch.length - 1].pre_step + 1,
            is_approved: "",
          }
        );

        const checkEnd = await ApprovalWorkFlowTeacher.findAll({
          where: { request_id },
        });
        if (checkEnd[checkEnd.length - 1].pre_step === checker.length) {
          await axios.post(
            "https://sellbackend.creditclan.com/parent/index.php/parents/teacher_approval",
            {
              request_id: request_id,
              step: "",
              is_approved: 1,
            }
          );
        }
        const checkTeacher2 = await axios.post(
          "https://sellbackend.creditclan.com/parent/index.php/parents/request_teacher",
          { request_id }
        );

        return res.json({
          response: checkTeacher2.data.request,
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
    let results = await ApprovalWorkFlowTeacher.findAll({
      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
