const messageModel = require("../models/message_model");

module.exports = {
  createMessage: async (req, res, next) => {
    const newMessage = new messageModel(req.body);

    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getMessage: async (req, res, next) => {
    try {
      const messages = await messageModel
        .find({
          conversationId: req.params.conversationId,
        })
        .populate("sender")
        .populate("conversationId")
        .exec();
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
