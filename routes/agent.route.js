const express = require("express");
let controller = require("../controllers/agent.controller");
const router = express.Router();

router.post("/api/insert-agent", controller.InsertFlow);
router.post("/api/approve-agent", controller.preApprovalWorkFlowAgent);
router.post("/api/approve-progress", controller.getEachRequestFlow);

module.exports = router;
