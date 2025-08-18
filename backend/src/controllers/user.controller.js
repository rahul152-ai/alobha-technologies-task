const User = require("../models/user.model");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password -__v")
      .populate("teams", "name");
    if (!users.length) {
      return res.status(200).json({ message: "No users found" });
    }

    const formattedUsers = users.map((user) => {
      const formattedUser = user.toObject();
      if (formattedUser.teams && formattedUser.teams.length) {
        formattedUser.teams = formattedUser.teams[0] || {};
      }
      return formattedUser;
    });

    res.status(200).json({
      message: "Users retrieved successfully",
      users: formattedUsers,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUserTeams = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user._id;

    const user = await User.findById(userId)
      .select("teams")
      .populate("teams", "name")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (!user || !user.teams || user.teams.length === 0) {
      return res.status(200).json({ message: "No teams found for this user" });
    }

    const totalTeams = user.teams.length;

    res.status(200).json({
      message: "User teams retrieved successfully",
      teams: user.teams,
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
