import pkg from 'sequelize';
// import { sequelize } from './index.mjs'
const { Sequelize, Model, DataTypes } = pkg;

export default (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  return User;
}
