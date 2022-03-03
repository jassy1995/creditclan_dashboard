const {
  Restaurant,
  ApproveRestaurant,
  CommentRestaurant,
  ApprovalWorkFlow,
  ApproveFlow,
  CrawlingRecord,
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
    let results = await Restaurant.findAll({
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
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.getSearchRestaurants = async (req, res) => {
  try {
    let results = await Restaurant.findAll({
      where: { restaurant_name: { [Op.like]: `%${req.body.searchItem}%` } },
    });
    return res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};

// exports.approveRestaurants = async (req, res) => {
//   const { user_id, restaurant_id } = req.body;
//   try {
//     let checkUser = await ApproveRestaurant.findOne({
//       where: { restaurant_id },
//     });
//     if (checkUser === null)
//       await ApproveRestaurant.create({
//         bm_id: null,
//         manager_id: null,
//         restaurant_id,
//         date: null,
//         is_approved: "-1",
//       });
//     const ch = await ApproveRestaurant.findOne({ where: { restaurant_id } });
//     if (ch.is_approved === "-1") {
//       await ApproveRestaurant.update(
//         { bm_id: user_id, is_approved: "0", date: Date.now() },
//         { where: { restaurant_id } }
//       );
//       await Restaurant.update(
//         { is_approved: "0" },
//         { where: { id: restaurant_id } }
//       );
//       let restaurant = await Restaurant.findOne({
//         where: { id: restaurant_id },
//       });
//       return res.json({ result: "0", restaurant });
//     } else if (ch.is_approved === "0") {
//       await ApproveRestaurant.update(
//         { is_approved: "1", manager_id: user_id },
//         { where: { restaurant_id } }
//       );
//       await Restaurant.update(
//         { is_approved: "1" },
//         { where: { id: restaurant_id } }
//       );
//       let restaurant = await Restaurant.findOne({
//         where: { id: restaurant_id },
//       });
//       return res.json({ result: "1", restaurant });
//     } else if (ch?.is_approved == "1") {
//       return res.json({ result: "done", restaurant_id });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error, message: "error occur" });
//   }
// };

exports.commentRestaurantMethod = async (req, res) => {
  const { comment, user_id, restaurant_id } = req.body;
  try {
    const result = await CommentRestaurant.create({
      comment,
      user_id,
      restaurant_id,
      date: Date.now(),
    });
    if (result.comment) return res.json("sent");
    else return res.json("sending failed");
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
    //   let results = await CommentRestaurant.findAll(
    //     {
    //       offset: req.body.start,
    //       limit: 10,
    //     },
    //     { where: { restaurant_id: req.body.request_id } }
    //   );
    //   return res.json(results);
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
    const checkTeacher = await Restaurant.findOne({
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
      checkTeacher?.is_approved !== 1
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
    // let all_restaurant = await Restaurant.findAll({
    //   where: { id: request.id },
    // });
    // let call_applicant = await ApprovalWorkFlow.findAll({
    //   where: { action: "call the applicant" },
    // });
    // let visit_restaurant = await ApprovalWorkFlow.findAll({
    //   where: { action: "visit the restaurant" },
    // });
    // let meet_restaurant_owner = await ApprovalWorkFlow.findAll({
    //   where: { action: "meet with restaurant owner" },
    // });
    // let sign_agreement = await ApprovalWorkFlow.findAll({
    //   where: { action: "sign agreement" },
    // });
    // let sign_agreement = await ApprovalWorkFlow.findAll({
    //   where: { action: "approve disbursement" },
    // });
    // let val = await ApprovalWorkFlow.findAll({
    //   attributes: [
    //     "ApprovalWorkFlow.action",
    //     [
    //       sequelize.fn("COUNT", sequelize.col("ApprovalWorkFlow.id")),
    //       "CountPerRequest",
    //     ],
    //   ],
    //   include: [
    //     {
    //       model: ApprovalWorkFlow,
    //       attributes: [],
    //       include: [],
    //     },
    //   ],
    //   group: ["ApprovalWorkFlow.pre_step"],
    //   raw: true,
    // });

    // let val = await ApprovalWorkFlow.findAll({
    //   attributes: {
    //     include: [
    //       [sequelize.fn("COUNT", sequelize.col("pre_step")), "totalPrice"],
    //     ],
    //   },
    // });

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

    // let array = [];
    // let allResults;

    // await axios
    //   .post("https://whatsapp.creditclan.com/rent/api/restaurant-detail", {
    //     start: 0,
    //   })
    //   .then((response) => {
    //     // console.log(response.data);
    //     allResults = response.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(allResults);

    // for (let index = 0; index < allResults.length; index++) {
    //   let arr = await ApprovalWorkFlow.findAll({
    //     where: { request_id: allResults[index].id },
    //   });

    //   if (arr.length > 0) {
    //     array.push(arr[arr.length - 1]);
    //   } else {
    //     array.push({ step: 0, action: "New request" });
    //   }
    // }

    // let groups = array.reduce((groups, param) => {
    //   const data = param.action;
    //   if (!groups[data]) {
    //     groups[data] = [];
    //   }
    //   groups[data].push(param);
    //   return groups;
    // }, {});
    // const groupArrays = Object.keys(groups).map((data) => {
    //   return {
    //     action: data,
    //     count: groups[data].length,
    //   };
    // });

    // let flows = await ApproveFlow.findAll({
    //   where: { category: "restaurant" },
    // });

    // for (let i = 0; i < flows.length; i++) {
    //   let verify = groupArrays.find((element) => {
    //     return element.action == flows[i].action;
    //   });
    //   if (!verify) {
    //     groupArrays.push({
    //       count: 0,
    //       action: flows[i].action,
    //     });
    //   }
    // }

    // let val = await ApprovalWorkFlow.findAll({
    //   where: {
    //     category: req.body.category,
    //   },
    // });
    // groupArrays;
    return res.json(val);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.SearchByStep = async (req, res) => {
  try {
    const result = await Restaurant.findAll({
      where: { step: req.body.stage },
      offset: req.body.start,
      limit: 20,
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
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
