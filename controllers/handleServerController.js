const chats = require('../model/chats');
const Server = require('../model/server')
const User = require('../model/user');

const handleAddServer = async (req,res) => {
    const { roomName, email } = req.body;
    
    if(!roomName) return res.status(400).json({ 'message': 'server name is required'})
    
    const user = await User.findOne({'email': email}).exec();
    try{
        const result = await Server.create({
            "server_name": roomName,
            "user": [user._id]
        });
        res.status(201).json({
            result,
            message: 'successfully created'
        });
    } catch (err){
        res.status(500).json({'message': err.message })
    }
}

const handleGetServer = async (req,res) => {
    try{ 
        const user = await User.findOne({ 'email': req.query.email }).exec();
        const dbserver = await Server.find({user: user.id}, { "user": 0, "__v": 0 }).populate('channels', { "server_id": 0 });
        res.setHeader('Content-Type', 'application/json')
        console.log(dbserver)
        res.status(200).json({dbserver})
    } catch(err){
        res.status(500).json({'message': err.message})
    }
}

// const handleGetServerId = async (req,res) => {
//     try{ 
//         console.log('req.params: ', req.params)
//         const user = await User.findOne({ 'email': req.query.email }).exec();
//         const dbserver = await Server.find({ user: user.id}, { "user": 0, "__v": 0 })
//         res.setHeader('Content-Type', 'application/json')
//         res.status(200).json({dbserver})
//     } catch(err){
//         res.status(500).json({'message': err.message})
//     }
// }

const handleGetServerId = async (req,res) => {
    try{ 
        const user = await User.findOne({ 'email': req.query.email }).exec();
        const channels = await chats.find({'server_id': req.params.server_id}, {"__v": 0, "server_id": 0})
        // const servers = await Server.find({user: user._id})
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({channels})
    } catch(err){
        res.status(500).json({'message': err.message})
    }
}

const deleteServer = async (req,res) => {
    try {
        await Server.deleteOne( {"_id": req.query.server_id})
        await chats.deleteMany({ "server_id": req.query.server_id})
        res.status(200).json({"message": 'deleted'})
    } catch(err){
        console.log(err)
    }
}

module.exports = { handleAddServer, handleGetServer, handleGetServerId, deleteServer }
