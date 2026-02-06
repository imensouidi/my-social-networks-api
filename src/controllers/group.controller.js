const Group = require("../models/Group");
exports.create = async (req, res) => {
  const group = await Group.create({
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon,
    coverPhoto: req.body.coverPhoto,
    type: req.body.type,
    allowPost: req.body.allowPost,
    allowEventCreation: req.body.allowEventCreation,
    admins: [req.user.id],
    members: [req.user.id]
  });

  res.status(201).json(group);
};
