const dbConfig = require('../config/dbConfig');
const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }

)

sequelize.authenticate()
    .then(()=>{
        console.log('connected successfully')
    })
    .catch(err=>{
        console.log(err)
    })

const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel')(sequelize, DataTypes)
db.posts = require('./postModel')(sequelize, DataTypes)
db.comments = require('./commentModel')(sequelize, DataTypes)

db.sequelize.sync({force: false})
.then(()=>{
    console.log('re sync done');
})

//user connection with post
db.users.hasMany(db.posts,{
    foreignKey: 'user_id',
    as: 'post'
})

db.posts.belongsTo(db.users,{
    foreignKey: 'user_id',
    as: 'user'
})

//post connection with comment
db.posts.hasMany(db.comments,{
    foreignKey: 'post_id',
    as: 'comment'
})

db.comments.belongsTo(db.posts,{
    foreignKey: 'post_id',
    as: 'post'
})

module.exports = db;