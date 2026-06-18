const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER },
  parentContact: { type: DataTypes.STRING },
  groupName: { type: DataTypes.STRING },
  level: { type: DataTypes.ENUM('A1', 'A2', 'B1'), defaultValue: 'A1' },
  totalStars: { type: DataTypes.INTEGER, defaultValue: 0 },
  rank: { type: DataTypes.STRING, defaultValue: 'Tələbə' },
}, {
  tableName: 'students',
  timestamps: true,
});

module.exports = Student;
