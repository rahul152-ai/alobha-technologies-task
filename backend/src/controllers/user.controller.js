const User = require("../models/user.model");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Fetch users with pagination
    const users = await User.find()
      .select("-password -__v -teams")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Optional: sort by newest first

    // Count total users for pagination
    const totalUsers = await User.countDocuments();

    // Format users
    const formattedUsers = users.map((user) => {
      const formattedUser = user.toObject();
      if (formattedUser.teams && formattedUser.teams.length) {
        formattedUser.teams = formattedUser.teams[0] || {};
      }
      return formattedUser;
    });

    res.status(200).json({
      message:
        users.length > 0 ? "Users retrieved successfully" : "No users found",
      users: formattedUsers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      },
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

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return next(new AppError("name email and password is required", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("User already exists", 400));
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, hashed, role: role || "user" });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const { query } = req.query;

    console.log("Search query:", query);

    // If no query provided, return empty array
    if (!query || query.trim() === "") {
      return res.status(200).json({
        message: "No search term provided",
        users: [],
      });
    }

    // Case-insensitive search by name
    const users = await User.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    })
      .select("_id name")
      .limit(10); // limit results for efficiency
    res.status(200).json({
      message: users.length ? "Users found" : "No users matched your search",
      users,
    });
  } catch (error) {
    next(error);
  }
};
