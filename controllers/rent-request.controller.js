const { CommentRequest, AgentDetail } = require("../models");

exports.rentRequestComment = async (req, res) => {
  const { comment, user_id, request_id } = req.body;
  try {
    const result = await CommentRequest.create({
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

// exports.createAgent = async (req, res) => {

//   try {
//     for (let index = 0; index < data.length; index++) {
//       const value = data[index];
//       await AgentDetail.create(value);
//     }
//     return res.json("done");
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error, message: "error occur" });
//   }
// };
