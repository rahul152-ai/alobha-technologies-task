const createLog = require("../helper/createLog");
const Todo = require("../models/todo.model");
const User = require("../models/user.model");

exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, teamId } = req.body;
    const userId = req.user._id;

    const newTodo = new Todo({
      title,
      description,
      creator: userId,
      team: teamId,
      allowedEditors: [userId], // Initially, the creator is the only allowed editor
    });

    await newTodo.save();

    await createLog(
      userId,
      "create",
      "todo",
      newTodo._id,
      `Todo "${title}" created successfully`
    );

    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const userTeams = await User.findById(userId).select("teams");

    const todos = await Todo.find({ team: { $in: userTeams } });

    res.status(200).json({
      message: "Todos retrieved successfully",
      todos,
    });
  } catch (error) {
    next(error);
  }
};
