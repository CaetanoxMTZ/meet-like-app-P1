const RoomService = require('../services/roomService');

exports.createRoom = async (req, res) => {
  const { name, description, capacity } = req.body;

  try {
    const newRoom = await RoomService.createRoom({ name, description, capacity });
    res.status(201).json(newRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao criar sala' });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await RoomService.getAllRooms();
    res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao listar salas' });
  }
};

exports.joinRoom = async (req, res) => {
  const { roomId } = req.body;
  const userId = req.user.id;

  try {
    const room = await RoomService.joinRoom(roomId, userId);
    res.status(200).json({ msg: 'Você entrou na sala com sucesso.', room });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  const { roomId } = req.params;
  const updateData = req.body;

  try {
    const updatedRoom = await RoomService.updateRoom(roomId, updateData);
    res.status(200).json(updatedRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao atualizar sala' });
  }
};

exports.deleteRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    await RoomService.deleteRoom(roomId);
    res.status(200).json({ msg: 'Sala deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao deletar sala' });
  }
};

exports.sendMessage = async (req, res) => {
  const { roomId } = req.params;
  const { message, email } = req.body; 

  if (!email) {
    return res.status(400).json({ msg: 'Email do usuário é necessário.' });
  }

  try {
    const newMessage = await RoomService.sendMessage(roomId, email, message); 
    req.io.to(roomId).emit('chatMessage', newMessage); 
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao enviar mensagem' });
  }
};

exports.getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await RoomService.getMessages(roomId);
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao obter mensagens' });
  }
};
