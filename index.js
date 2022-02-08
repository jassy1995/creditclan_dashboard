const express = require("express");
const app = express();
const cors = require("cors");
const {
  Restaurant,
  ApproveRestaurant,
  CommentRestaurant,
  CommentHouse,
  CommentRequest,
  ListHouse,
  sequelize,
  ApproveHouse,
} = require("./models");

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
    let checkUser = await ApproveRestaurant.findOne({
      where: { restaurant_id },
    });
    if (checkUser === null)
      await ApproveRestaurant.create({
        bm_id: null,
        manager_id: null,
        restaurant_id,
        date: null,
        is_approved: "-1",
      });
    const ch = await ApproveRestaurant.findOne({ where: { restaurant_id } });
    if (ch.is_approved === "-1") {
      await ApproveRestaurant.update(
        { bm_id: user_id, is_approved: "0", date: Date.now() },
        { where: { restaurant_id } }
      );
      await Restaurant.update(
        { is_approved: "0" },
        { where: { id: restaurant_id } }
      );
      let restaurant = await Restaurant.findOne({
        where: { id: restaurant_id },
      });
      return res.json({ result: "0", restaurant });
    } else if (ch.is_approved === "0") {
      await ApproveRestaurant.update(
        { is_approved: "1", manager_id: user_id },
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
    } else if (ch?.is_approved === "1") {
      return res.json({ result: "done", restaurant_id });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
});

app.post("/api/comment", async (req, res) => {
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
});

app.post("/api/comment-request", async (req, res) => {
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
});

app.post("/api/comment-house-list", async (req, res) => {
  const { comment, user_id, house_id } = req.body;
  try {
    const result = await CommentHouse.create({
      comment,
      user_id,
      house_id,
      date: Date.now(),
    });
    if (result.comment) return res.json("sent");
    else return res.json("sending failed");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
});

app.post("/api/house-list", async (req, res) => {
  try {
    let results = await ListHouse.findAll({
      offset: req.body.start,
      limit: 20,
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
});

app.post("/api/house-list/searchItem", async (req, res) => {
  try {
    let results = await ListHouse.findAll({
      where: { address: req.body.searchItem?.toLowerCase() },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
});

app.post("/api/house-approve", async (req, res) => {
  const { user_id, house_id } = req.body;
  try {
    let checkUser = await ApproveHouse.findOne({
      where: { house_id },
    });
    if (checkUser === null)
      await ApproveHouse.create({
        bm_id: null,
        manager_id: null,
        house_id,
        date: null,
        is_approved: "-1",
      });
    const ch = await ApproveHouse.findOne({ where: { house_id } });
    if (ch.is_approved == "-1") {
      await ApproveHouse.update(
        { bm_id: user_id, is_approved: "0", date: Date.now() },
        +{ where: { house_id } }
      );
      await ListHouse.update({ is_approved: "0" }, { where: { id: house_id } });
      let house = await ListHouse.findOne({
        where: { id: house_id },
      });
      return res.json({ result: "0", house });
    } else if (ch.is_approved == "0") {
      await ApproveHouse.update(
        { is_approved: "1", manager_id: user_id },
        { where: { house_id } }
      );
      await ListHouse.update({ is_approved: "1" }, { where: { id: house_id } });
      let house = await ListHouse.findOne({
        where: { id: house_id },
      });
      return res.json({ result: "1", house });
    } else if (ch?.is_approved == "1") {
      return res.json({ result: "done", house_id });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
});

app.post("/api/update-restaurant-record", async (req, res) => {
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
});

const PORT = process.env.PORT || 2022;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
