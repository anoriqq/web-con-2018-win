'use strict';
require('dotenv').config();

// パッケージの読み込み
const Sequelize = require('sequelize');
const debug = require('debug')('sequelize');

// sequelizeインスタンスの作成
const username = process.env.PSQL_USERNAME;
const password = process.env.PSQL_PASSWORD;
const sequelize = new Sequelize(
  `postgres://${username}:${password}@localhost/web_con_2018_win`,
  {logging:(args)=>{
    debug(args);
  }}
);

module.exports = {
  database: sequelize,
  Sequelize
};
