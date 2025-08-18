const Log = require("../models/log.model");

exports.getAllLogForAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, actorName, fromDate, toDate } = req.query;

    // Build the filter object
    let filter = {};

    // Filter by actor name if provided
    if (actorName) {
      filter["actor.name"] = { $regex: actorName, $options: "i" };
    }

    // Filter by date range if provided
    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate); // From date
      if (toDate) filter.createdAt.$lte = new Date(toDate); // To date
    }

    // Pagination and filtering logic
    const logs = await Log.find(filter)
      .populate("actor", "name")
      .select("-__v")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    if (!logs || logs.length === 0) {
      return res.status(200).json({ message: "No logs found" });
    }

    // Count total logs to provide total pages for pagination
    const totalLogs = await Log.countDocuments(filter);

    res.status(200).json({
      data: logs,
      message: "Logs retrieved successfully",
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalLogs / limit),
        totalLogs,
      },
    });
  } catch (error) {
    next(error);
  }
};
