const Log = require("../models/log.model");

// Helper function to create logs for critical actions

/**
 * Creates a log entry for a specific action.
 * @param {*} actor - The user who performed the action
 * @param {*} actionType - Type of action (e.g., create, edit, delete)
 * @param {*} entityType - Type of entity (e.g., 'todo', 'team', 'user')
 * @param {*} entityId - The ID of the affected entity
 * @param {*} description - A readable description of the event
 */
const createLog = async (
  actor,
  actionType,
  entityType,
  entityId,
  description
) => {
  try {
    const log = new Log({
      actor,
      actionType,
      entityType,
      entityId,
      description,
    });

    await log.save();
    console.log("Log created successfully:", log);
  } catch (err) {
    console.error("Error creating log:", err);
  }
};

module.exports = createLog;
