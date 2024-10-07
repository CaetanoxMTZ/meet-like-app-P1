const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body, validationResult } = require('express-validator');


router.post('/register',
  [
    body('name', 'Nome é obrigatório').notEmpty(),
    body('email', 'Email é obrigatório').isEmail(),
    body('password', 'Senha deve ter pelo menos 6 caracteres').isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    authController.registerUser(req, res);
  }
);


router.post('/login',
  [
    body('email', 'Email é obrigatório').isEmail(),
    body('password', 'Senha é obrigatória').exists()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    authController.loginUser(req, res);
  }
);

module.exports = router;
