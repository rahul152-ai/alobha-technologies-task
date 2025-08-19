const createLog = require("../helper/createLog");
const Todo = require("../models/todo.model");
const User = require("../models/user.model");
const AppError = require("../utils/appError");

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
    const { page = 1, limit = 10 } = req.query;

    const userTeams = await User.findById(userId).select("teams");

    const todos = await Todo.find({ team: { $in: userTeams.teams } })
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("team", "name")
      .populate("creator", "name email");

    if (!todos.length) {
      return res.status(200).json({ message: "No todos found" });
    }

    // if allowedEditors array contain the userId then add isEditable field true;
    const formattedTodos = todos.map((todo) => {
      const isEditable = todo.allowedEditors.includes(userId);
      return { ...todo.toObject(), isEditable };
    });

    res.status(200).json({
      message: "Todos retrieved successfully",
      todos: formattedTodos,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(todos.length / limit),
        totalTodos: todos.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    // todo id
    const { id } = req.params;
    const userId = req.user._id;
    const user = await User.findById(userId).select("teams");

    const todo = await Todo.findById(id)
      .populate("team", "name")
      .populate("creator", "name email")
      .select("-__v");
    // Check if the user is part of the team associated with the todo
    if (!user.teams.includes(todo.team._id.toString())) {
      return next(new AppError("You are not part of this team", 403));
    }

    if (!todo) {
      return next(new AppError("Todo not found", 404));
    }

    res.status(200).json({
      message: "Todo retrieved successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, newUserId } = req.body;
    const userId = req.user._id;

    const todo = await Todo.findById(id);
    if (!todo) {
      return next(new AppError("Todo not found", 404));
    }

    // Update status if user is in allowedEditors
    if (status !== undefined) {
      if (!todo.allowedEditors.includes(userId)) {
        return next(
          new AppError("You are not allowed to update the status", 403)
        );
      }
      todo.status = status;
    }

    // Add newUserId to allowedEditors if user is creator and newUserId have member in the team
    if (newUserId) {
      const newUser = await User.findById(newUserId).select("teams");
      console.log("new userrs", newUser);
      if (todo.creator.toString() !== userId.toString()) {
        return next(new AppError("Only the creator can add editors", 403));
      }

      if (!newUser.teams.includes(todo.team.toString())) {
        return next(new AppError("New user is not part of the team", 403));
      }
      if (!todo.allowedEditors.includes(newUserId)) {
        todo.allowedEditors.push(newUserId);
      }
    }

    await todo.save();

    await createLog(
      userId,
      "update",
      "todo",
      todo._id,
      `Todo "${todo.title}" updated successfully`
    );

    res.status(200).json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
};
