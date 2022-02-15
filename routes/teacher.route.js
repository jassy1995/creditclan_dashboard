const express = require("express");
const { teacherLoanComment } = require("../controllers/teacher.controller");
const router = express.Router();

router.post("/api/comment-teacher-loan", teacherLoanComment);

module.exports = router;
