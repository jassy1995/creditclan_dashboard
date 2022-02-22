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
    if (result.comment) return res.json("sent");
    else return res.json("sending failed");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getTeacherComment = async (req, res) => {
  try {
    let results = await CommentTeacherLoan.findAll(
      {
        offset: req.body.start,
        limit: 10,
      },
      { where: { request_id: req.body.request_id } }
    );
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
    const checkTeacher = await Teacher.findOne({
      where: { id: request_id },
    });

    if (ch.length == 0) {
      try {
        await ApprovalWorkFlowTeacher.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: 1,
          date: Date.now(),
        });
        await Teacher.update({ step: 1 }, { where: { id: request_id } });
        let request2 = await Teacher.findOne({
          where: { id: request_id },
        });

        return res.json({ restaurant: request2, message: "updated" });
      } catch (error) {
        return res.json({ error });
      }
    } else if (
      ch[ch.length - 1].pre_step < checker.length &&
      checkTeacher?.is_approved !== 1
    ) {
      try {
        await ApprovalWorkFlowTeacher.create({
          user_id: user_id,
          action: action,
          request_id,
          pre_step: ch[ch.length - 1].pre_step + 1,
          date: Date.now(),
        });
        await Teacher.update(
          { step: ch[ch.length - 1].pre_step + 1 },
          { where: { id: request_id } }
        );
        const checkEnd = await ApprovalWorkFlowTeacher.findAll({
          where: { request_id },
        });
        if (checkEnd[checkEnd.length - 1].pre_step === checker.length) {
          await Teacher.update(
            { is_approved: 1 },
            { where: { id: request_id } }
          );
        }

        let request2 = await Teacher.findOne({
          where: { id: request_id },
        });

        return res.json({
          restaurant: request2,
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

exports.getSummaryOfRequestStage = async (req, res) => {
  try {
    let val = await Teacher.findAll({
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

    for (let i = 0; i < flow.length; i++) {
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
