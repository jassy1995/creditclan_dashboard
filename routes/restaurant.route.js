const express = require("express");
let Controller = require("../controllers/restaurant.controller");
const router = express.Router();

router.post("/api/restaurant-detail", Controller.getAllRestaurants);
router.post(
  "/api/restaurant-detail/searchItem",
  Controller.getSearchRestaurants
);
// router.post("/api/approve", Controller.approveRestaurants);
router.post("/api/comment", Controller.commentRestaurantMethod);
router.post("/api/update-restaurant-record", Controller.updateRestaurantRecord);
router.post("/api/get-restaurant-comment", Controller.getAllRestaurantComment);
router.get("/api/get-restaurant-workflow", Controller.getWorkFlow);
router.post("/api/save-action-workflow", Controller.saveWorkFlow);
router.post("/api/pre_approve", Controller.preApprovalWorkFlowRestaurant);
router.post("/api/get-flow", Controller.getAllFlowRestaurantFlow);
router.post("/api/get-current-request", Controller.getInitialValue);
router.get("/api/fetch-summary", Controller.getSummaryOfRequestStage);
router.post("/api/save-scrawling-record", Controller.CrawlingRecordMonitor);
router.post("/api/get-restaurant-per-step", Controller.SearchByStep);

module.exports = router;
