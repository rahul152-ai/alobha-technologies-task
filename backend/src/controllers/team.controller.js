const createLog = require("../helper/createLog");
const Team = require("../models/team.model");
const User = require("../models/user.model");
const AppError = require("../utils/appError");

// Create new team
exports.createTeam = async (req, res, next) => {
  const { name } = req.body;

  try {
    const teamExists = await Team.findOne({ name });
    if (teamExists) return next(new AppError("Team already exists", 400));

    const newTeam = new Team({ name });
    await newTeam.save();
    await createLog(
      req.user._id,
      "add team",
      "team",
      newTeam._id,
      `Team created: ${name}`
    );

    res.status(201).json({ message: "Team created successfully!" });
  } catch (error) {
    next(error);
  }
};

// Add user to team
exports.addUserToTeam = async (req, res, next) => {
  const { teamId, userId } = req.body;

  try {
    // Find the team
    const team = await Team.findById(teamId);
    if (!team) return next(new AppError("Team not found", 404));

    // Find the user
    const user = await User.findById(userId);
    if (!user) return next(new AppError("User not found", 404));

    // Check if the user is already in the team
    if (team.users.includes(userId)) {
      return next(new AppError("User already in the team", 400));
    }

    // Add the user to the team
    team.users.push(userId);
    await team.save();

    // Add the team to the user's list of teams
    user.teams.push(teamId);
    await user.save();

    await createLog(
      req.user._id,
      "add user to team",
      "team",
      teamId,
      `User ${user.name} added to team ${team.name}`
    );

    res.status(200).json({ message: "User added to the team!" });
  } catch (error) {
    next(error);
  }
};

// get all teams

exports.getAllTeams = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Fetch teams with pagination
    const teams = await Team.find()
      .select("-__v")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ name: 1 });

    const teamWithUserCounts = teams.map((team) => {
      const t = team.toObject();
      t.totalUsers = team.users?.length || 0;
      return t;
    });

    // Check if any teams are found
    if (!teams || teams.length === 0) {
      return res.status(200).json({ message: "No teams found" });
    }

    // Count total teams to calculate total pages
    const totalTeams = await Team.countDocuments();

    // Send the response with pagination info
    res.status(200).json({
      teams: teamWithUserCounts,
      message: "Teams retrieved successfully!",
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalTeams / limit),
        totalTeams,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.searchTeams = async (req, res, next) => {
  try {
    const { query } = req.query;

    // If no query provided, return empty array
    if (!query || query.trim() === "") {
      return res.status(200).json({
        message: "No search term provided",
        users: [],
      });
    }

    // Case-insensitive search by name
    const teams = await Team.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
      $and: [{ users: { $in: [req.user._id] } }],
    })
      .select("_id name")
      .limit(10); // limit results for efficiency
    res.status(200).json({
      message: teams.length ? "Teams found" : "No teams matched your search",
      teams,
    });
  } catch (error) {
    next(error);
  }
};
