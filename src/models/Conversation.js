const { DataTypes } = require("sequelize");
const sequalize = require('../utils/connection')

const Conversation = sequalize.define('conversation', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    // UserId
});

module.exports = Conversation;