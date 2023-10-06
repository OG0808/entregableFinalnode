const User = require("../models/User");
const catchError = require("../utils/catchError");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const getAll = catchError(async (req, res) => {
    const result = await User.findAll()
    return res.json(result)
});
const create = catchError(async (req, res) => {
    const { userName, email, password, firstname, lastname } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    const body = { userName, email, password: hashPassword, firstname, lastname }
    const result = await User.create(body)
    return res.status(201).json(result)
})
const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id)
    if (!result) return res.status(404);
    return res.json(result)
});
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } })
    if (!result) return res.status(404);
    return res.sendStatus(204)
});
const update = catchError(async (req, res) => {
    const { id } = req.params;
    delete req.body.password;
    const result = await User.update(req.body, { where: { id }, returning: true })
    if (result[0] === 0) return res.sendStatus(404)
    return res.json(result[1][0])
});

const login = catchError(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } })
    if (!user) return res.sendStatus(401);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.sendStatus(401)
    const token = jwt.sign(
        { user },
        process.env.TOKEN,
        { expiresIn: '1d' }
    )


    return res.json({ user, token })

});
const logger = catchError(async (req, res) => {
    const user = req.user
    return res.json(user)

})






module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logger



}


