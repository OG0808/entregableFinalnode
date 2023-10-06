

const Message = require("../models/Message");
const catchError = require("../utils/catchError");


const getAll = catchError(async (req, res) => {
    const result = await Message.findAll()
    return res.json(result)
});
const create = catchError(async (req, res) => {
    const { id, userName } = req.user;
    const { content, conversationId } = req.body;
    const messageBody = { content, createdBy: userName, userId: id, conversationId };
    const result = await Message.create(messageBody);

    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Message.destroy({ where: { id } })
    if (!result) return res.sendStatus(401)

    return res.sendStatus(204)
});



module.exports = {
    getAll,
    create,
    remove
}