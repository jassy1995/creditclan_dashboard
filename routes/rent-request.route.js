const express = require("express");
const {
  rentRequestComment,
} = require("../controllers/rent-request.controller");
const router = express.Router();

router.post("/api/comment-request", rentRequestComment);

module.exports = router;
