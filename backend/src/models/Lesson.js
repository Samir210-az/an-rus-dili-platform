const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lesson = sequelize.define('Lesson', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  topic: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  startTime: { type: DataTypes.TIME, allowNull: false },
  endTime: { type: DataTypes.TIME, allowNull: false },
  teacherId: { type: DataTypes.UUID, allowNull: false },
  groupName: { type: DataTypes.STRING },
  roomNumber: { type: DataTypes.STRING },
  category: {
    type: DataTypes.ENUM('danishiq', 'oxu', 'yazi', 'qrammatika', 'oyun'),
    defaultValue: 'danishiq',
  },
}, {
  tableName: 'lessons',
  timestamps: true,
});

module.exports = Lesson;
