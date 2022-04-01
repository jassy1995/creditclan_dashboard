const express = require("express");
const {
  getComment,
  preApprovalWorkFlowMerchant,
  commentMerchantMethod,
  updateMerchantRecord,
  getSearchMerchant,
  rejectRequest,
  getProgress,
  getSummaryOfRequestStage,
  SearchByStep,
  getAllMerchants,
} = require("../controllers/merchant.controller");
const router = express.Router();

router.post("/api/all-merchant", getAllMerchants);
router.post("/api/comment-merchant", commentMerchantMethod);
router.post("/api/get-merchant-comment", getComment);
router.post("/api/update-merchant-record", updateMerchantRecord);
router.post("/api/search-merchant", getSearchMerchant);
router.post("/api/reject-request", rejectRequest);
router.post("/api/get-progress", getProgress);
router.get("/api/get-summary-merchant", getSummaryOfRequestStage);

router.post("/api/approve-merchant", preApprovalWorkFlowMerchant);
router.post("/api/get-merchant-per-step", SearchByStep);

module.exports = router;
