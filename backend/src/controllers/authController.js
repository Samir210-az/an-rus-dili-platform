const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Yalnız LOGIN - sign-up yoxdur, çünki istifadəçilər yalnız admin tərəfindən yaradılır
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'İstifadəçi adı və ya şifrə yanlışdır' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'İstifadəçi adı və ya şifrə yanlışdır' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '8h' }
    );
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        mustChangePassword: user.mustChangePassword,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası', error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    user.password = await bcrypt.hash(newPassword, 10);
    user.mustChangePassword = false;
    await user.save();
    res.json({ message: 'Şifrə uğurla dəyişdirildi' });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası', error: err.message });
  }
};

exports.me = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
  res.json(user);
};
