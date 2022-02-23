const express = require("express");
const {
  rentRequestComment,
  getAllRentComment,
  preApprovalWorkFlowRent,
} = require("../controllers/rent-request.controller");
const router = express.Router();

router.post("/api/comment-request", rentRequestComment);
router.post("/api/get-rent-request-comment", getAllRentComment);
router.post("/api/approve-rent", preApprovalWorkFlowRent);

module.exports = router;
