const express = require("express");
const {
  rentRequestComment,
  getAllRentComment,
  preApprovalWorkFlowRent,
  getEachRequestFlow,
} = require("../controllers/rent-request.controller");
const router = express.Router();

router.post("/api/comment-request", rentRequestComment);
router.post("/api/get-rent-request-comment", getAllRentComment);
router.post("/api/approve-rent", preApprovalWorkFlowRent);
router.post("/api/get-each-request-flow-rent", getEachRequestFlow);

module.exports = router;
