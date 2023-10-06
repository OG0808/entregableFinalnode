const { getAll, create, remove } = require("../controllers/message.controllers");
const expres = require('express');



const routerMessage = expres.Router();

routerMessage.route('/')
    .get(getAll)
    .post(create)

routerMessage.route('/:id')
    .delete(remove)

module.exports = routerMessage;    
