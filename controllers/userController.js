const db = require('../modles');

const User = db.users;

module.exports = {
    createUser: async(req, res)=>{
        const {name, email, password, gender, mobile} = req.body;
        const existingUser = await User.find({where: {email: email}});
    },
    getAllUser: async(req, res)=>{
        const users = await db.users.findAll();
        if(users.length>0){
            res.status(200).json(users)
        }else{
            res.status(201).json({
                message: 'no user registered'
            })
        }
    },
    getUserById: async(req, res)=>{
        
    },
    editUser: async(req, res)=>{
        
    },
    deleteUser: async(req, res)=>{
        
    }
};