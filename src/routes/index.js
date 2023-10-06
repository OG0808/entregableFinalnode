const express = require('express');
const routerUser = require('./user.router');
const routerConversation = require('./conversation.router');
const routerMessage = require('./message.router');
const { verifyJwt } = require('../utils/verifyJwt')


const router = express.Router();

// colocar las rutas aquí

router.use('/users', routerUser)
router.use('/conversations', verifyJwt, routerConversation)
router.use('/messages', verifyJwt, routerMessage)





module.exports = router;