const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http'); 
const { Server } = require('socket.io'); 
const path = require('path');
const { swaggerUi, swaggerDocs } = require('./swagger');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado!'))
.catch((err) => console.error('Erro ao conectar ao MongoDB', err));


const server = http.createServer(app);
const io = new Server(server);

app.use((req, res, next) => {
  req.io = io; 
  next();
});

// Rotas
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/rooms', require('./routes/room'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);
  
  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`Cliente ${socket.id} entrou na sala: ${roomId}`);
  });


  socket.on('chatMessage', (msgData) => {
    const { roomId, message } = msgData;
    console.log(`Mensagem recebida na sala ${roomId}: ${message}`);


    io.to(roomId).emit('message', { message, sender: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

