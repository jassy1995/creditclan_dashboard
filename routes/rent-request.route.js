const express = require("express");
const {
  rentRequestComment,
  createAgent,
} = require("../controllers/rent-request.controller");
const router = express.Router();

router.post("/api/comment-request", rentRequestComment);
router.post("/api/agent", createAgent);

module.exports = router;
