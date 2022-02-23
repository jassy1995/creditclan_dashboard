const express = require("express");
const {
  getAllHouse,
  getSearchHouse,
  approveHouse,
  commentHouseMethod,
  updateHouseRecord,
  getAllHouseComment,
  getEachRequestFlow,
  // getSummaryOfRequestStageHouse,
} = require("../controllers/house.controller");
const router = express.Router();

router.post("/api/house-list", getAllHouse);
router.post("/api/house-list/searchItem", getSearchHouse);
router.post("/api/house-approve", approveHouse);
router.post("/api/comment-house-list", commentHouseMethod);
router.post("/api/update-house", updateHouseRecord);
router.post("/api/get-house-list-comment", getAllHouseComment);
router.post("/api/request-flow-house", getEachRequestFlow);
// router.get("/api/summary-house", getSummaryOfRequestStageHouse);

module.exports = router;
