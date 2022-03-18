const axios = require("axios");
const {
  CommentSchoolLoan,
  ApprovalWorkFlowSchool,
  ApproveFlow,
} = require("../models");

exports.schoolLoanComment = async (req, res) => {
  const { comment, user_id, request_id } = req.body;
  try {
    const result = await CommentSchoolLoan.create({
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

exports.getAllSchoolComment = async (req, res) => {
  try {
    // let results = await CommentSchoolLoan.findAll(
    //   {
    //     offset: req.body.start,
    //     limit: 10,
    //   },
    //   { where: { request_id: req.body.request_id } }
    // );
    let results = await CommentSchoolLoan.findAll({
      offset: req.body.start,
      limit: 10,

      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.preApprovalWorkFlowSchool = async (req, res) => {
  const { user_id, request_id, action, category } = req.body;
  try {
    const checker = await ApproveFlow.findAll({ where: { category } });
    const ch = await ApprovalWorkFlowSchool.findAll({ where: { request_id } });
    const checkSchool = await axios.post(
      "https://sellbackend.creditclan.com/parent/index.php/parents/request_school",
      { request_id }
    );

    if (ch.length == 0 && checker.length !== 0) {
      try {
        await ApprovalWorkFlowSchool.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: 1,
          date: Date.now(),
        });
        const updatedOne = await axios.post(
          "https://sellbackend.creditclan.com/parent/index.php/parents/school_approval",
          {
            request_id: request_id,
            step: 1,
            status: "",
          }
        );
        // await Restaurant.update({ step: 1 }, { where: { id: request_id } });
        // let request2 = await Restaurant.findOne({
        //   where: { id: request_id },
        // });

        return res.json({
          response: updatedOne.data.request,
          message: "updated",
        });
      } catch (error) {
        return res.json({ error });
      }
    } else if (
      ch[ch.length - 1].pre_step < checker.length &&
      Number(checkSchool.data.request?.status) !== 1
    ) {
      try {
        await ApprovalWorkFlowSchool.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: ch[ch.length - 1].pre_step + 1,
          date: Date.now(),
        });

        await axios.post(
          "https://sellbackend.creditclan.com/parent/index.php/parents/school_approval",
          {
            request_id: request_id,
            step: ch[ch.length - 1].pre_step + 1,
            status: "",
          }
        );
        const checkEnd = await ApprovalWorkFlowSchool.findAll({
          where: { request_id },
        });

        if (checkEnd[checkEnd.length - 1].pre_step === checker.length) {
          await axios.post(
            "https://sellbackend.creditclan.com/parent/index.php/parents/school_approval",
            {
              request_id: request_id,
              step: "",
              status: 1,
            }
          );
          // await Teacher.update(
          //   { is_approved: 1 },
          //   { where: { id: request_id } }
          // );
        }
        // await Restaurant.update(
        //   { step: ch[ch.length - 1].pre_step + 1 },
        //   { where: { id: request_id } }
        // );
        // let request2 = await Restaurant.findOne({
        //   where: { id: request_id },
        // });
        const checkSchool2 = await axios.post(
          "https://sellbackend.creditclan.com/parent/index.php/parents/request_school",
          { request_id }
        );

        return res.json({
          response: checkSchool2.data.request,
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
    let results = await ApprovalWorkFlowSchool.findAll({
      where: { request_id: req.body.request_id },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
