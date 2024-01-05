// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Antes de crear un usuario, hasheamos la contraseña
User.beforeCreate(async (user) => {
  const hashPass = await bcrypt.hash(user.password, 10);
  user.password = hashPass;
});

module.exports = User;
