import pkg from 'sequelize';
import dbConfig from "../config/db.config.mjs";
import users from "../models/user.model.mjs";

const { Sequelize } = pkg;
const connectionString = `postgres://ijrpwiyi:TkD6T_2XhjlK-msA6zqUEjFJr1J8VMaO@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.USER}`;

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = users(sequelize, Sequelize);

export default db;
