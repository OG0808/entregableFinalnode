const { DataTypes } = require("sequelize");
const sequelize = require('../utils/connection')

const Message = sequelize.define('message', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: { // Cambiado de "craetedBy" a "createdBy"
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = Message;
