require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const User = require('../models/User');

async function seed() {
  await sequelize.sync();
  const existing = await User.findOne({ where: { username: 'admin' } });
  if (existing) {
    console.log('Super admin artıq mövcuddur.');
    return process.exit(0);
  }
  const hashed = await bcrypt.hash('admin123', 10);
  await User.create({
    username: 'admin',
    password: hashed,
    role: 'super_admin',
    firstName: 'Super',
    lastName: 'Admin',
    mustChangePassword: true,
  });
  console.log('✅ Super Admin yaradıldı -> login: admin | şifrə: admin123 (ilk girişdə dəyişdirin!)');
  process.exit(0);
}

seed();
