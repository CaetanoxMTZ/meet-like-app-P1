const Room = require('../models/Room');
const Message = require('../models/Message');

class RoomRepository {
  async create(roomData) {
    const room = new Room(roomData);
    return await room.save();
  }

  async findAll() {
    return await Room.find({});
  }

  async findById(roomId) {
    return await Room.findById(roomId);
  }

  async joinRoom(roomId, userId) {
    const room = await this.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }


    if (!room.participants) {
      room.participants = [];
    }

    if (!room.participants.includes(userId)) {
      room.participants.push(userId);
      await room.save();
    }

    return room; 
  }

  async updateRoom(roomId, updateData) {
    return await Room.findByIdAndUpdate(roomId, updateData, { new: true });
  }

  async deleteRoom(roomId) {
    return await Room.findByIdAndDelete(roomId);
  }

  async sendMessage(roomId, userId, messageContent) {
    const newMessage = new Message({
      roomId,
      userId,
      message: messageContent,
    });
    return await newMessage.save();
  }

  async getMessages(roomId) {
    return await Message.find({ roomId }).populate('userId', 'name');
  }
}
module.exports = new RoomRepository();
