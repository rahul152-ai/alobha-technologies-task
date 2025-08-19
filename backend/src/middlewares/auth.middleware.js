const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
require("dotenv").config();
module.exports = async (req, res, next) => {
  try {
    // Extract Authorization Header
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      return next(new AppError("Not authenticated.", 401));
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;

    try {
      // Verify the Token
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        err.statusCode = 401;
        err.message = "Token has expired.";
      } else if (err.name === "JsonWebTokenError") {
        err.statusCode = 401;
        err.message = "Invalid token.";
      } else {
        err.statusCode = 500;
      }
      throw err;
    }

    if (!decodedToken) {
      return next(new AppError("Not authenticated.", 401));
    }
    req.user = await User.findById(decodedToken._id).select("-password -__v");

    if (!req.user) {
      return next(new AppError("Token is invalid", 401));
    }
    // Proceed to the Next Middleware/Endpoint
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    if (error?.code === "ENOTFOUND") {
      error.message = "Oops! Something went wrong. Please try again later";
    }
    if (!error.message) {
      error.message = "An error occurred.";
    }
    next(new AppError(error.message, error.statusCode));
  }
};
