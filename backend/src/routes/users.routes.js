const router = require("express").Router();
const {
  getAllUsers,
  getAllUserTeams,
  createUser,
  searchUsers,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { isAdmin, isUser } = require("../middlewares/role.middleware");

router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/search", authMiddleware, isAdmin, searchUsers);
router.post("/", authMiddleware, isAdmin, createUser);
router.get("/teams", authMiddleware, isUser, getAllUserTeams);

module.exports = router;
