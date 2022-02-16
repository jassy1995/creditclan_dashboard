const { CommentTeacherLoan } = require("../models");
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
    let results = await CommentTeacherLoan.findAll({
      offset: req.body.start,
      limit: 10,
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
