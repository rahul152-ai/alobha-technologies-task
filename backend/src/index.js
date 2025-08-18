const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error.middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/teams", require("./routes/team.routes"));
app.use("/api/todos", require("./routes/todo.routes"));
app.use("/api/logs", require("./routes/log.routes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
