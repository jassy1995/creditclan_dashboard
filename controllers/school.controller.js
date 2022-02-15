const { CommentSchoolLoan } = require("../models");

exports.schoolLoanComment = async (req, res) => {
  const { comment, user_id, request_id } = req.body;
  try {
    const result = await CommentSchoolLoan.create({
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
