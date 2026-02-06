const Message = require("../models/Message");

exports.createMessage = async (req, res) => {
  const message = await Message.create({
    discussion: req.params.discussionId,
    author: req.user.id,
    content: req.body.content
  });
  res.status(201).json(message);
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find({
    discussion: req.params.discussionId
  });
  res.json(messages);
};
