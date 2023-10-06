const { DataTypes } = require("sequelize");
const sequalize = require('../utils/connection')

const User = sequalize.define('user', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },

    firstname: {
        type: DataTypes.STRING,
        allowNull: false

    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false

    },




});
User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
}



module.exports = User;