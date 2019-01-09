'use strict';

// モジュールの読み込み
const loader = require('./_sequelizeLoader');
const Sequelize = loader.Sequelize;

// テーブルを定義
const Messages = loader.database.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: Sequelize.STRING,
  score: Sequelize.INTEGER,
  color: Sequelize.STRING,
  created_at: Sequelize.DATE
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Messages;
