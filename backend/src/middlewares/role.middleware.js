const AppError = require("../utils/appError");

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new AppError("You do not have permission to access this resource.", 403)
    );
  }
  next();
};

exports.isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return next(
      new AppError("You do not have permission to access this resource.", 403)
    );
  }
  next();
};
