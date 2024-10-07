const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const roomRoutes = require('./room');

router.get('/', (req, res) => {
  res.send('funcionando...');
});

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);


module.exports = router;
