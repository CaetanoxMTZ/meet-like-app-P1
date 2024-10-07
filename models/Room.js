const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const roomSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, 
  },
  name: { type: String, required: true },
  description: { type: String },
  capacity: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  participants: { type: [String], default: [] }, 
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
