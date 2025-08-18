// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";

  if (err?.code === "ENOTFOUND") {
    err.message = "Oops! Something went wrong. Please try again later";
    statusCode = 503;
  }

  // for duplicate key errors
  if (err?.code === 11000) {
    const duplicateField = Object.keys(err.keyValue)[0];
    const duplicateValue = err.keyValue[duplicateField];
    err.message = `Duplicate entry for ${duplicateField}: ${duplicateValue}. Please choose another ${duplicateField}.`;
    statusCode = 400;
  }

  if (process.env.NODE_ENV === "development") {
    // Log error details in development environment
    // console.error("ERROR:development", err);
    return res.status(statusCode).json({
      status,
      message: err.message,
      stack: err.stack,
      details: err.details || null,
    });
  }

  // In production, do not leak stack trace to the client
  if (process.env.NODE_ENV === "production") {
    console.error("ERROR:production", err);
    if (err.isOperational) {
      return res.status(statusCode).json({
        status,
        message: err.message,
      });
    }

    // For unknown errors, send a generic message
    return res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = errorHandler;
