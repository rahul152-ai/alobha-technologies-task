const router = require("express").Router();
const {
  getAllUsers,
  getAllUserTeams,
  createUser,
  searchUsers,
  getTeamUser,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { isAdmin, isUser } = require("../middlewares/role.middleware");

router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/search", authMiddleware, isAdmin, searchUsers);
router.post("/", authMiddleware, isAdmin, createUser);
// get current user all teams
router.get("/teams", authMiddleware, isUser, getAllUserTeams);
// Get users of a particular team
router.get("/team-user/:teamId", authMiddleware, isUser, getTeamUser);

module.exports = router;
