const { getAll, create, update, getOne, setUsers, remove } = require("../controllers/conversation.controllers");
const expres = require('express');


const routerConversation = expres.Router();

routerConversation.route('/')
    .get(getAll)
    .post(create)

routerConversation.route('/:id')
    .get(getOne)
    .delete(remove)
    .post(update)


routerConversation.route('/:id/users')
    .post(setUsers)

module.exports = routerConversation;