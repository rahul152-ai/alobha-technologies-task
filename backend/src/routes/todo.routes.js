const route = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { isAdmin, isUser } = require("../middlewares/role.middleware");

const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

route.post("/", authMiddleware, isUser, createTodo);
route.get("/", authMiddleware, isUser, getAllTodos);
// route.get("/:id", authMiddleware, isUser, getTodoById);
// route.put("/:id", authMiddleware, isUser, updateTodo);
// route.delete("/:id", authMiddleware, isUser, deleteTodo);

module.exports = route;
