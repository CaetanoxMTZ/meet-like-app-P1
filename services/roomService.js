const { v4: uuidv4 } = require('uuid');
const RoomRepository = require('../repositories/roomRepository');
const Message = require('../models/Message'); 

class RoomService {
  async createRoom(roomData) {
    roomData.roomId = uuidv4(); 
    return await RoomRepository.create(roomData);
  }

  async joinRoom(roomId, userId) {
    return await RoomRepository.joinRoom(roomId, userId);
  }

  async getAllRooms() {
    return await RoomRepository.findAll();
  }

  async updateRoom(roomId, updateData) {
    return await RoomRepository.updateRoom(roomId, updateData);
  }

  async deleteRoom(roomId) {
    return await RoomRepository.deleteRoom(roomId);
  }

  async sendMessage(roomId, email, message) {
    const newMessage = new Message({
      roomId,
      email,
      message,
      timestamp: new Date(),
    });

    await newMessage.save(); 
    return newMessage;
  }

  async getMessages(roomId) {
    return await Message.find({ roomId }).sort({ timestamp: 1 }); 
  }
}

module.exports = new RoomService();
