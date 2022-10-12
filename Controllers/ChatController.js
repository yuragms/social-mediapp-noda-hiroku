import ChatModel from "../Models/ChatModel.js";

export const createChat = async (req, res) => {
  const oldChat = await ChatModel.find({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });

  console.log("old: ", oldChat);
  console.log("oldChat.length: ", oldChat.length);

  if (oldChat.length > 0) {
    const result = "this users already have chat";
    console.log(result);
    res.status(201).json(result);
  } else {
    const newChat = new ChatModel({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      console.log(req.body.senderId, req.body.receiverId);
      const result = await newChat.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
