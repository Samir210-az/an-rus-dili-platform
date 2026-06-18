const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lessonId: { type: DataTypes.UUID, allowNull: false },
  studentId: { type: DataTypes.UUID, allowNull: false },
  status: {
    type: DataTypes.ENUM('geldi', 'gelmedi', 'esasli'),
    defaultValue: 'geldi',
  },
}, {
  tableName: 'attendances',
  timestamps: true,
});

module.exports = Attendance;
