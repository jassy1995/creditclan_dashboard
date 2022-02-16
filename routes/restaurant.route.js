const express = require("express");
let Controller = require("../controllers/restaurant.controller");
const router = express.Router();

router.post("/api/restaurant-detail", Controller.getAllRestaurants);
router.post(
  "/api/restaurant-detail/searchItem",
  Controller.getSearchRestaurants
);
router.post("/api/approve", Controller.approveRestaurants);
router.post("/api/comment", Controller.commentRestaurantMethod);
router.post("/api/update-restaurant-record", Controller.updateRestaurantRecord);
router.post("/api/get-restaurant-comment", Controller.getAllRestaurantComment);
router.get("/api/get-restaurant-workflow", Controller.getWorkFlow);

module.exports = router;
