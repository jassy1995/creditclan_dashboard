const express = require("express");
const {
  getAllHouse,
  getSearchHouse,
  approveHouse,
  commentHouseMethod,
  updateHouseRecord,
} = require("../controllers/house.controller");
const router = express.Router();

router.post("/api/house-list", getAllHouse);
router.post("/api/house-list/searchItem", getSearchHouse);
router.post("/api/house-approve", approveHouse);
router.post("/api/comment-house-list", commentHouseMethod);
router.post("/api/update-house", updateHouseRecord);

module.exports = router;
