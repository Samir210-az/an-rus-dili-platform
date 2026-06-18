const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Announcement = sequelize.define('Announcement', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  authorId: { type: DataTypes.UUID, allowNull: false },
  targetGroup: { type: DataTypes.STRING }, // null = hamı üçün
}, { tableName: 'announcements', timestamps: true });

module.exports = Announcement;
