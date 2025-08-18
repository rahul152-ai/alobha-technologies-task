const express = require("express");
const { isAdmin } = require("../middlewares/role.middleware");
const {
  createTeam,
  addUserToTeam,
  getAllTeams,
} = require("../controllers/team.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllTeams);
router.post("/create", authMiddleware, isAdmin, createTeam); // Only Admin can create teams
router.post("/addUser", authMiddleware, isAdmin, addUserToTeam); // Only Admin can add users to teams

module.exports = router;
