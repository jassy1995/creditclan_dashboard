const express = require("express");
const app = express();
const cors = require("cors");
const { Restaurant, Approval, sequelize } = require("./models");

// require("dotenv").config();
sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/restaurant-all", async (req, res) => {
  try {
    let results = await Restaurant.findAll();
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
});

app.post("/api/restaurant-detail", async (req, res) => {
  try {
    let results = await Restaurant.findAll({
      offset: req.body.start,
      limit: 20,
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
});

app.post("/api/restaurant-detail/searchItem", async (req, res) => {
  try {
    let results = await Restaurant.findAll({
      where: { restaurant_name: req.body.searchItem?.toLowerCase() },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
});

app.post("/api/approve", async (req, res) => {
  const { user_id, restaurant_id } = req.body;
  try {
    let checkUser = await Approval.findOne({
      where: { restaurant_id },
    });
    if (checkUser === null)
      await Approval.create({
        user_id: null,
        approval_id: null,
        restaurant_id,
        is_approved: "0",
        comments: null,
      });
    const ch = await Approval.findOne({ where: { restaurant_id } });
    if (ch.is_approved === "0") {
      await Approval.update(
        { user_id, is_approved: "1", date: Date.now() },
        { where: { restaurant_id } }
      );
      await Restaurant.update(
        { is_approved: "1" },
        { where: { id: restaurant_id } }
      );
      let restaurant = await Restaurant.findOne({
        where: { id: restaurant_id },
      });
      return res.json({ result: "1", restaurant });
    } else if (ch.is_approved === "1") {
      await Approval.update(
        { is_approved: "2", approval_id: user_id },
        { where: { restaurant_id } }
      );
      await Restaurant.update(
        { is_approved: "2" },
        { where: { id: restaurant_id } }
      );
      let restaurant = await Restaurant.findOne({
        where: { id: restaurant_id },
      });
      return res.json({ result: "2", restaurant });
    } else if (ch.is_approved?.toString() === "2") {
      return res.json({ result: "done", resId: restaurant_id });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
});

app.post("/api/comment", async (req, res) => {
  // const { comment, restaurant_id } = req.body;
  // try {
  //  let checkRes =  await Approval.findOne({
  //     where: { restaurant_id },
  //   });
  //   if(checkRes.comments  !== null && checkRes.comments !== undefined ){
  //      await Approval.update(
  //       { comments: [...checkRes.comments,comment] },
  //       { where: { restaurant_id } }
  //     );
  //     return res.json("success")
  //   }else if(checkRes.comment === null){
  //      await Approval.update(
  //       { comments: [comment] },
  //       { where: { restaurant_id } }
  //     );
  //   }
  //   return res.json("success")
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({ error, message: "error occur" });
  // }
});

const PORT = process.env.PORT || 2022;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
