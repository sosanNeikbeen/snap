const conversationModel = require("../models/conversation_model");

module.exports = {
  createConversation: async (req, res, next) => {
    const newConversation = new conversationModel({
      members: [req.body.senderId, req.body.receiverId],
    });

    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserConversation: async (req, res, next) => {
    try {
      const conversation = await conversationModel.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUsersConversation: async (req, res, next) => {
    try {
      const conversation = await conversationModel.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
