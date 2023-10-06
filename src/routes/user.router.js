const { getAll, create, getOne, remove, update, login, logger } = require("../controllers/user.controllers");
const express = require('express')
const { verifyJwt } = require('../utils/verifyJwt')

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJwt, getAll)
    .post(create)

routerUser.route('/login')
    .post(login)


routerUser.route('/me')
    .get(verifyJwt, logger)

routerUser.route('/:id')
    .get(verifyJwt, getOne)
    .delete(remove)
    .put(update)



module.exports = routerUser;



