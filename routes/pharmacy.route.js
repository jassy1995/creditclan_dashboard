const express = require("express");
let Controller = require("../controllers/pharmacy.controller");
const router = express.Router();

// router.post("/api/restaurant-detail", Controller.getAllRestaurants);
// router.post(
//   "/api/restaurant-detail/searchItem",
//   Controller.getSearchRestaurants
// );
// router.post("/api/approve", Controller.approveRestaurants);
router.post("/api/pharmacy/comment", Controller.commentPharmacyMethod);
router.post("/api/update-pharmacy-record", Controller.updatePharmacyRecord);
// router.post("/api/get-restaurant-comment", Controller.getAllRestaurantComment);
// router.get("/api/get-restaurant-workflow", Controller.getWorkFlow);
// router.post("/api/save-action-workflow", Controller.saveWorkFlow);
router.post("/api/pharmacy_approve", Controller.preApprovalWorkFlowPharmacy);
// router.post("/api/get-flow", Controller.getAllFlowRestaurantFlow);
// router.post("/api/get-current-request", Controller.getInitialValue);
router.get("/api/pharmacy-summary", Controller.getSummaryOfRequestStage);
// router.post("/api/save-scrawling-record", Controller.CrawlingRecordMonitor);
// router.post("/api/get-restaurant-per-step", Controller.SearchByStep);
router.post("/api/reject-pharmacy-request", Controller.rejectRequest);

module.exports = router;
