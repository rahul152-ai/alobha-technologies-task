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
      "create todo",
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
    const { page = 1, limit = 10, title, creator, team, fromDate, toDate } = req.query;

    const userTeams = await User.findById(userId).select("teams");

    let match = {
      team: { $in: userTeams.teams },
    };

    // Date filter
    if (fromDate || toDate) {
      match.createdAt = {};
      if (fromDate) match.createdAt.$gte = new Date(fromDate);
      if (toDate) match.createdAt.$lte = new Date(toDate);
    }

    //Aggregation pipeline
    const pipeline = [
      { $match: match },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      {
        $lookup: {
          from: "teams",
          localField: "team",
          foreignField: "_id",
          as: "team"
        },
      },
      { $unwind: "$team" },
    ];

    // Text filters
    if (title) {
      pipeline.push({
        $match: { title: { $regex: title, $options: "i" } },
      });
    }

    if (creator) {
      pipeline.push({
        $match: { "creator.name": { $regex: creator, $options: "i" } },
      });
    }

    if (team) {
      pipeline.push({
        $match: { "team.name": { $regex: team, $options: "i" } },
      });
    }

    const totalTodos = (await Todo.aggregate([...pipeline])).length;

    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: Number(limit) });

    pipeline.push({
      $project: {
        __v: 0,
        "creator.password": 0, 
        "creator.teams": 0,
        "creator.email": 0,
        "creator.role": 0,
        "creator.__v": 0,
        "team.__v": 0,
        "team.users": 0,
        "team.createdAt": 0,
        "team.updatedAt": 0,
      },
    });

    let todos = await Todo.aggregate(pipeline);

    // Add isEditable flag
    todos = todos.map((todo) => {
      const isEditable = todo.allowedEditors.some(
        (editorId) => editorId.toString() === userId.toString()
      );
      return { ...todo, isEditable };
    });

    res.status(200).json({
      message: todos.length ? "Todos retrieved successfully" : "No todos found",
      todos,
      pagination: {
        total: totalTodos,
        page: Number(page),
        totalPages: Math.ceil(totalTodos / limit),
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

       await createLog(
          userId,
          "edit todo status",
          "todo",
          todo._id,
          `Todo status updated successfully`
        );
      todo.status = status;
    }

    // Add newUserId to allowedEditors if user is creator and newUserId have member in the team
    if (newUserId) {
      const newUser = await User.findById(newUserId).select("teams");
      if (todo.creator.toString() !== userId.toString()) {
        return next(new AppError("Only the creator can add editors", 403));
      }

      if (!newUser.teams.includes(todo.team.toString())) {
        return next(new AppError("New user is not part of the team", 403));
      }
      if (!todo.allowedEditors.includes(newUserId)) {
        todo.allowedEditors.push(newUserId);
        await createLog(
          userId,
          "share access",
          "todo",
          todo._id,
          `new user is added to allowed editors for todo "${todo.title}"`
        );
      }
    }

    await todo.save();

    res.status(200).json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
};
