const db = require("../modles");

const Comments = db.comments;
const Posts = db.posts;

module.exports = {
  createComment: async (req, res) => {
    const { name } = req.user;
    if (req.body.comment !== undefined) {
      const comment = await Comments.create({
        name: name,
        comment: req.body.comment,
        post_id: req.query.postId,
      });
      res.status(200).json({
        status: "success",
        comment: comment,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "there have no content on comment body",
      });
    }
  },
  getAllComment: async (req, res) => {
    const comments = await Comments.findAll();
    if (comments.length > 0) {
      res.status(200).json({
        status: "success",
        comments: comments,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "no comment found",
      });
    }
  },
  getCommentById: async (req, res) => {
    const id = req.params.id;
    const comment = await Comments.findOne({
      where: { id: id },
      include: [
        {
          model: Posts,
          as: "post",
          attributes: { exclude: ["user_id", "updatedAt", "createdAt"] },
        },
      ],
      attributes: { exclude: ["post_id"] },
    });
    if (comment !== null) {
      res.status(200).json({
        status: "success",
        comment: comment,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "comment not found",
      });
    }
  },
  editComment: async (req, res) => {
    const id = req.params.id;
    try{
        const updatedComment = await Comments.update(req.body, {
            where: { id: id },
          });
          if (updatedComment[0] === 1) {
            res.send("comment updated successfully");
          }
    }catch(err){
        console.log(err)
    }
  },
  deleteComment: async (req, res) => {
    const id = req.params.id;
    const result = await Comments.destroy({ where: { id: id } });
    if (result === 1) {
      res.status(200).json({
        message: "comment deleted successfully",
      });
    } else {
      res.status(400).json({
        error: "there have some error",
      });
    }
  },
};
