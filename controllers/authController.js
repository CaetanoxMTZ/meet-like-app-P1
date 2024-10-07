const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no registro de usuário' });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas - Email' });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas - Senha' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao fazer login' });
  }
};
