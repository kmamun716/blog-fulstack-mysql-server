const jwt = require('jsonwebtoken');

const verifyToken=async(req, res, next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
        if(err){
            console.log(err)
        }else{
            req.user = decoded
            next();
        }
    })
};

module.exports = verifyToken;