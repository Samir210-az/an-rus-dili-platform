const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Homework = sequelize.define('Homework', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  fileUrl: { type: DataTypes.STRING },
  deadline: { type: DataTypes.DATE, allowNull: false },
  difficulty: { type: DataTypes.ENUM('asan', 'orta', 'cetin'), defaultValue: 'orta' },
  teacherId: { type: DataTypes.UUID, allowNull: false },
  groupName: { type: DataTypes.STRING },
}, { tableName: 'homeworks', timestamps: true });

const HomeworkSubmission = sequelize.define('HomeworkSubmission', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  homeworkId: { type: DataTypes.UUID, allowNull: false },
  studentId: { type: DataTypes.UUID, allowNull: false },
  answerText: { type: DataTypes.TEXT },
  answerFileUrl: { type: DataTypes.STRING },
  grade: { type: DataTypes.INTEGER },
  feedback: { type: DataTypes.TEXT },
  submittedAt: { type: DataTypes.DATE },
}, { tableName: 'homework_submissions', timestamps: true });

module.exports = { Homework, HomeworkSubmission };
