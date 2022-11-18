module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_id:{
      type: DataTypes.INTEGER,
    }
  });

  return Comment;
};
