const Group = require("../models/Group");

exports.create = async (req, res) => {
  const group = await Group.create({
    ...req.body,
    admins: [req.user.id],
    members: [req.user.id]
  });
  res.status(201).json(group);
};
