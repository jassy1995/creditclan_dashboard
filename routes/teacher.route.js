const express = require("express");
const {
  teacherLoanComment,
  getTeacherComment,
  preApprovalWorkFlowTeacher,
  getAllTeachersLoan,
  // getSummaryOfRequestStageTeacher,
  getEachRequestFlow,
} = require("../controllers/teacher.controller");
const router = express.Router();

router.post("/api/comment-teacher-loan", teacherLoanComment);
router.post("/api/get-teacher-comment", getTeacherComment);
router.post("/api/pre-approve-teacher", preApprovalWorkFlowTeacher);
router.post("/api/get-all-teacher-loan", getAllTeachersLoan);
// router.get(
//   "/api/get-summary-workflow-teacher",
//   getSummaryOfRequestStageTeacher
// );
router.post("/api/get-each-request-flow", getEachRequestFlow);

module.exports = router;
