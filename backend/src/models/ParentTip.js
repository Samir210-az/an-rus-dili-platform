const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ParentTip = sequelize.define('ParentTip', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.ENUM('danishiq', 'oxu', 'yazi', 'qrammatika', 'umumi'), defaultValue: 'umumi' },
  authorId: { type: DataTypes.UUID },
}, { tableName: 'parent_tips', timestamps: true });

module.exports = ParentTip;
