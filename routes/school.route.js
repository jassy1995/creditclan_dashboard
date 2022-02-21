const express = require("express");
const {
  schoolLoanComment,
  getAllSchoolComment,
} = require("../controllers/school.controller");
const router = express.Router();

router.post("/api/comment-school-loan", schoolLoanComment);
router.post("/api/get-school-comment", getAllSchoolComment);
router.post("/api/pre-approve-school", preApprovalWorkFlowSchool);

module.exports = router;
