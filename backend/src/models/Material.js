const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Material = sequelize.define('Material', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  category: {
    type: DataTypes.ENUM('danishiq', 'oxu', 'yazi', 'qrammatika', 'oyun'),
    allowNull: false,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT }, // mətn, dialoq, qayda izahı
  level: { type: DataTypes.ENUM('A1', 'A2', 'B1'), defaultValue: 'A1' },
  difficulty: { type: DataTypes.ENUM('asan', 'orta', 'cetin'), defaultValue: 'orta' },
  audioUrl: { type: DataTypes.STRING },
  imageUrl: { type: DataTypes.STRING },
  fileUrl: { type: DataTypes.STRING },
  teacherId: { type: DataTypes.UUID },
}, { tableName: 'materials', timestamps: true });

// Test/Quiz sualları (oxu anlama, qrammatika, oyun) - hər material birdən çox sual ola bilər
const Question = sequelize.define('Question', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  materialId: { type: DataTypes.UUID, allowNull: false },
  type: { type: DataTypes.ENUM('multiple_choice', 'open_answer', 'fill_blank', 'matching'), defaultValue: 'multiple_choice' },
  questionText: { type: DataTypes.TEXT, allowNull: false },
  options: { type: DataTypes.JSON }, // ["variant1","variant2",...] - multiple_choice/matching üçün
  correctAnswer: { type: DataTypes.STRING, allowNull: false },
  points: { type: DataTypes.INTEGER, defaultValue: 10 },
}, { tableName: 'questions', timestamps: true });

// Şagirdin quiz cəhdi və xalı
const QuizAttempt = sequelize.define('QuizAttempt', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  studentId: { type: DataTypes.UUID, allowNull: false },
  materialId: { type: DataTypes.UUID, allowNull: false },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
  totalQuestions: { type: DataTypes.INTEGER, defaultValue: 0 },
  answers: { type: DataTypes.JSON }, // {questionId: givenAnswer}
}, { tableName: 'quiz_attempts', timestamps: true });

module.exports = { Material, Question, QuizAttempt };
