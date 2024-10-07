const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController'); 
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da sala
 *         description:
 *           type: string
 *           description: Descrição da sala
 *         capacity:
 *           type: integer
 *           description: Capacidade da sala
 *       example:
 *         name: Sala 1
 *         description: Sala de reunião para desenvolvimento
 *         capacity: 10
 * 
 *     Message:
 *       type: object
 *       required:
 *         - message
 *         - email
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem enviada pelo usuário
 *         email:
 *           type: string
 *           description: Email do remetente
 *       example:
 *         message: "Essa é a mensagem"
 *         email: "usuario@example.com"
 * 
 *     JoinRoom:
 *       type: object
 *       required:
 *         - roomId
 *       properties:
 *         roomId:
 *           type: string
 *           description: ID da sala
 *       example:
 *         roomId: "1234-abcd-5678-efgh"
 */

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Gerenciamento de salas de reunião
 */

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Cria uma nova sala de reunião
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Sala criada com sucesso
 *       500:
 *         description: Erro ao criar sala
 */
router.post('/', authMiddleware, roomController.createRoom);

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Retorna todas as salas de reunião
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Lista de todas as salas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       500:
 *         description: Erro ao listar salas
 */
router.get('/', authMiddleware, roomController.getAllRooms);

/**
 * @swagger
 * /api/rooms/join:
 *   post:
 *     summary: Permite que um usuário entre em uma sala de reunião
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JoinRoom'
 *     responses:
 *       200:
 *         description: Usuário entrou na sala com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                 room:
 *                   $ref: '#/components/schemas/Room'
 *       500:
 *         description: Erro ao entrar na sala
 */
router.post('/join', authMiddleware, roomController.joinRoom);

/**
 * @swagger
 * /api/rooms/{roomId}:
 *   put:
 *     summary: Atualiza uma sala de reunião existente
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da sala a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sala atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar a sala
 */
router.put('/:roomId', authMiddleware, roomController.updateRoom);

/**
 * @swagger
 * /api/rooms/{roomId}:
 *   delete:
 *     summary: Deleta uma sala de reunião
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da sala a ser deletada
 *     responses:
 *       200:
 *         description: Sala deletada com sucesso
 *       500:
 *         description: Erro ao deletar sala
 */
router.delete('/:roomId', authMiddleware, roomController.deleteRoom);

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Envio e recebimento de mensagens em uma sala
 */

/**
 * @swagger
 * /api/rooms/{roomId}/message:
 *   post:
 *     summary: Envia uma mensagem para uma sala de reunião
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Mensagem enviada com sucesso
 *       400:
 *         description: Falta o email do usuário
 *       500:
 *         description: Erro ao enviar mensagem
 */
router.post('/:roomId/message', authMiddleware, roomController.sendMessage);

/**
 * @swagger
 * /api/rooms/{roomId}/messages:
 *   get:
 *     summary: Retorna todas as mensagens de uma sala de reunião
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da sala
 *     responses:
 *       200:
 *         description: Lista de todas as mensagens da sala
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Erro ao listar mensagens
 */
router.get('/:roomId/messages', authMiddleware, roomController.getMessages);


module.exports = router;
