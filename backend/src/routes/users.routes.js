const router = require("express").Router();
const {
  getAllUsers,
  getAllUserTeams,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { isAdmin, isUser } = require("../middlewares/role.middleware");

router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/teams", authMiddleware, isUser, getAllUserTeams);

module.exports = router;
