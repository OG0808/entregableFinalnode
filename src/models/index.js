const Conversation = require("./Conversation");
const Message = require("./Message");
const User = require("./User");

User.hasMany(Conversation)//userId
Conversation.belongsTo(User)

User.hasMany(Message)//userId
Message.belongsTo(User)

Conversation.hasMany(Message)//conversationId
Message.belongsTo(Conversation)

Conversation.belongsToMany(User, { through: 'Participants' })//conversationId
User.belongsToMany(Conversation, { through: 'Participants' })


