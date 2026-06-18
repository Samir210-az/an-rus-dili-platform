const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

function generatePassword() {
  return crypto.randomBytes(4).toString('hex'); // 8 simvollu müvəqqəti şifrə
}

// POST /api/users - Admin yeni istifadəçi (müəllim/şagird/valideyn) yaradır
exports.createUser = async (req, res) => {
  try {
    const { username, role, firstName, lastName, ...profileData } = req.body;

    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'Bu istifadəçi adı artıq mövcuddur' });

    const tempPassword = generatePassword();
    const hashed = await bcrypt.hash(tempPassword, 10);

    const user = await User.create({
      username,
      password: hashed,
      role,
      firstName,
      lastName,
      mustChangePassword: true,
      createdBy: req.user.id,
    });

    if (role === 'student') {
      await Student.create({ userId: user.id, firstName, lastName, ...profileData });
    } else if (role === 'teacher') {
      await Teacher.create({ userId: user.id, firstName, lastName, ...profileData });
    }

    res.status(201).json({
      message: 'İstifadəçi yaradıldı',
      username,
      temporaryPassword: tempPassword, // Admin bunu istifadəçiyə çatdırmalıdır
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası', error: err.message });
  }
};

// GET /api/users
exports.getUsers = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    await user.update(req.body);
    res.json({ message: 'İstifadəçi yeniləndi', user });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası', error: err.message });
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    if (user.role === 'super_admin') {
      return res.status(403).json({ message: 'Super Admin silinə bilməz' });
    }
    await user.destroy();
    res.json({ message: 'İstifadəçi silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası', error: err.message });
  }
};

// POST /api/users/:id/reset-password - Admin şifrəni sıfırlayır
exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    const tempPassword = generatePassword();
    user.password = await bcrypt.hash(tempPassword, 10);
    user.mustChangePassword = true;
    await user.save();
    res.json({ message: 'Şifrə sıfırlandı', temporaryPassword: tempPassword });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası', error: err.message });
  }
};
