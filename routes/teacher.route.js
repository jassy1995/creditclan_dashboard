const express = require("express");
const {
  teacherLoanComment,
  getTeacherComment,
  preApprovalWorkFlowTeacher,
  getAllTeachersLoan,
  getSummaryOfRequestStage,
} = require("../controllers/teacher.controller");
const router = express.Router();

router.post("/api/comment-teacher-loan", teacherLoanComment);
router.post("/api/get-teacher-comment", getTeacherComment);
router.post("/api/pre-approve-teacher", preApprovalWorkFlowTeacher);
router.post("/api/get-all-teacher-loan", getAllTeachersLoan);
router.post("/api/get-summary-workflow-teacher", getSummaryOfRequestStage);

module.exports = router;
