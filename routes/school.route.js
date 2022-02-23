const express = require("express");
const {
  schoolLoanComment,
  getAllSchoolComment,
  preApprovalWorkFlowSchool,
  getEachRequestFlow,
} = require("../controllers/school.controller");
const router = express.Router();

router.post("/api/comment-school-loan", schoolLoanComment);
router.post("/api/get-school-comment", getAllSchoolComment);
router.post("/api/pre-approve-school", preApprovalWorkFlowSchool);
router.post("/api/get-each-request-flow-school", getEachRequestFlow);

module.exports = router;
