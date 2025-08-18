const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");
const { getAllLogForAdmin } = require("../controllers/log.controller");

router.get("/", authMiddleware, isAdmin, getAllLogForAdmin);

module.exports = router;
