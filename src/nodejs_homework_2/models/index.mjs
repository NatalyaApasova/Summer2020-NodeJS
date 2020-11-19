import pkg from 'sequelize';
import { v4 as uuid } from 'uuid';

const { Sequelize } = pkg;
// const sequelize = new Sequelize(connectionString);

// export default sequelize;
import dbConfig from "../config/db.config.mjs";
// import Sequelize from "sequelize";
import users from "./user.model.mjs";

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
