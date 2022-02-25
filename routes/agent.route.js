const express = require("express");
let controller = require("../controllers/agent.controller");
const router = express.Router();

router.post("/api/insert-agent", controller.InsertFlow);
router.post("/api/approve-agent", controller.preApprovalWorkFlowAgent);
router.post("/api/approve-progress", controller.getEachRequestFlow);
router.post("/api/create-agent-comment", controller.agentComment);
router.post("/api/get-agent-comment", controller.getAgentComment);

module.exports = router;
