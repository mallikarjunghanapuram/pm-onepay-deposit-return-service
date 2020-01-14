"use strict";

const Router = require("koa-router");

const router = new Router();
const healthController = require("./controllers/health");
const onepayRedirectController = require("./controllers/onepayRedirect");

router.get("/health", healthController.health);

router.get("/deposit/onepay", onepayRedirectController.onepayRedirect);

module.exports = router;