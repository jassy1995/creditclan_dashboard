const express = require("express");
const {
  teacherLoanComment,
  getTeacherComment,
  preApprovalWorkFlowTeacher,
} = require("../controllers/teacher.controller");
const router = express.Router();

router.post("/api/comment-teacher-loan", teacherLoanComment);
router.post("/api/get-teacher-comment", getTeacherComment);
router.post("/api/pre-approve-teacher", preApprovalWorkFlowTeacher);

module.exports = router;
