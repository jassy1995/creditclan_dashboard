const express = require("express");
const {
  teacherLoanComment,
  getTeacherComment,
} = require("../controllers/teacher.controller");
const router = express.Router();

router.post("/api/comment-teacher-loan", teacherLoanComment);
router.post("/api/get-teacher-comment", getTeacherComment);

module.exports = router;
