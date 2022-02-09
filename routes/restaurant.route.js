const express = require("express");
const {
  getAllRestaurants,
  getSearchRestaurants,
  approveRestaurants,
  commentRestaurantMethod,
  updateRestaurantRecord,
} = require("../controllers/restaurant.controller");
const router = express.Router();

router.post("/api/restaurant-detail", getAllRestaurants);
router.post("/api/restaurant-detail/searchItem", getSearchRestaurants);
router.post("/api/approve", approveRestaurants);
router.post("/api/comment", commentRestaurantMethod);
router.post("/api/update-restaurant-record", updateRestaurantRecord);

module.exports = router;
