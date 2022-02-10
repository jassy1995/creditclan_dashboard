const express = require("express");
let controller = require("../controllers/crawled-property.controller");
const router = express.Router();

router.post("/api/list-crawled-properties", controller.getAllProperty);
router.post("/api/list-search-property", controller.searchProperty);
router.post("/api/approve-property", controller.approveProperty);
router.post("/api/initialize", controller.iniTializerFunction);

module.exports = router;
