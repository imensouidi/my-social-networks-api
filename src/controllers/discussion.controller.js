const Discussion = require("../models/Discussion");

exports.createForGroup = async (req, res) => {
  const discussion = await Discussion.create({
    type: "group",
    group: req.params.groupId
  });
  res.status(201).json(discussion);
};

exports.createForEvent = async (req, res) => {
  const discussion = await Discussion.create({
    type: "event",
    event: req.params.eventId
  });
  res.status(201).json(discussion);
};

exports.getDiscussion = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);
  res.json(discussion);
};
