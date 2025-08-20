const Log = require("../models/log.model");
const User = require("../models/user.model");
exports.getAllLogForAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, actorName, fromDate, toDate } = req.query;

    let filter = {};

    // Filter by actor name
    if (actorName) {
      const actorIds = await User.find({
        name: { $regex: actorName, $options: "i" },
      }).distinct("_id");

      filter.actor = { $in: actorIds };
    }

    // Filter by date range
    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    const logs = await Log.find(filter)
      .populate("actor", "name")
      .select("-__v")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalLogs = await Log.countDocuments(filter);

    res.status(200).json({
      logs,
      message: logs.length ? "Logs retrieved successfully" : "No logs found",
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
