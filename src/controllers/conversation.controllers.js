
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const catchError = require("../utils/catchError");



const getAll = catchError(async (req, res) => {
    const result = await Conversation.findAll({
        include: [
            {
                model: User,
                attributes: ['firstname']
            }
        ]
    })
    return res.json(result)
});
const create = catchError(async (req, res) => {
    const { id, userName } = req.user


    const { title, type } = req.body;
    if (type !== 'pareja' && type !== 'grupal') return res.status(400).json(
        { error: "El tipo de conversación debe ser en 'pareja' o 'grupal'" })
    const body = { title, type, createdBy: userName, userId: id }
    const result = await Conversation.create(body);

    return res.json(result)
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Conversation.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ['firstname']


            },
            {
                model: Message,
                attributes: ['content', 'createdBy']



            }
        ]
    })
    return res.json(result)
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Conversation.destroy({ where: { id } })
    if (!result) return res.sendStatus(404)

    return res.sendStatus(204)
})
const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Conversation.update(req.body, { where: { id }, returning: true });
    if (result[0] === 0) return res.sendStatus(404)

    return res.json(result[1][0])

});

const setUsers = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Conversation.findByPk(id);

    await result.setUsers(req.body);
    const user = await result.getUsers();

    return res.json(user)
})




module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setUsers


}
