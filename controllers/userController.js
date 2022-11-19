const db = require('../modles');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.users;

module.exports = {
    register: async(req, res)=>{
        const {name, email, password, gender, mobile} = req.body;
        const existingUser = await User.findOne({where: {email: email}});
        if(existingUser !== null){
            return res.status(203).json({
                message: 'user already registered'
            })
        }else{
            bcrypt.hash(password, 11, (err, hash)=>{
                if(err){
                    console.log(err)
                }else{
                    const newUser = { name, email, password: hash, gender, mobile };
                    User.create(newUser)
                        .then(user=>{
                            const registerd = {
                                name: user.name,
                                email: user.email
                            }
                            res.status(200).json({
                                message: 'user successfully registered',
                                user: registerd
                            })
                        })
                        .catch(err=>console.log(err))
                }
            })
        }
    },
    login: async(req, res)=>{
        const {email, password} = req.body;
        const user = await User.findOne({where: {email: email}});
        bcrypt.compare(password, user.password, (err, data)=>{
            if(!data){
                return res.status(203).json({
                    message: 'password not matched'
                })
            }else{
                const newUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                const token = jwt.sign(newUser, process.env.SECRET, {expiresIn: '2h'});
                res.status(200).json(token)
            }
        })
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