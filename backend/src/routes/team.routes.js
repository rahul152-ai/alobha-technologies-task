const express = require("express");
const { isAdmin, isUser } = require("../middlewares/role.middleware");
const {
  createTeam,
  addUserToTeam,
  getAllTeams,
  searchTeams,
} = require("../controllers/team.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllTeams);
router.get("/search", authMiddleware, isUser, searchTeams);
router.post("/create", authMiddleware, isAdmin, createTeam); // Only Admin can create teams
router.post("/addUser", authMiddleware, isAdmin, addUserToTeam); // Only Admin can add users to teams

module.exports = router;
