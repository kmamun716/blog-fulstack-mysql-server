module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
      },
      user_id:{
        type: DataTypes.INTEGER,
      }
    });
  
    return Post;
  };
  