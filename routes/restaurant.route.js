const express = require("express");
const Controller = require("../controllers/restaurant.controller");
const router = express.Router();

router.post("/api/restaurant-detail", Controller.getAllRestaurants);
router.post(
  "/api/restaurant-detail/searchItem",
  restaurantController.getSearchRestaurants
);
router.post("/api/approve", Controller.approveRestaurants);
router.post("/api/comment", Controller.commentRestaurantMethod);
router.post("/api/update-restaurant-record", Controller.updateRestaurantRecord);

module.exports = router;
