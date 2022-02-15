const express = require("express");
const { schoolLoanComment } = require("../controllers/school.controller");
const router = express.Router();

router.post("/api/comment-school-loan", schoolLoanComment);

module.exports = router;
