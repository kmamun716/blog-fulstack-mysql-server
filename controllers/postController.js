const db = require("../modles");

const Posts = db.posts;
const User = db.users;
const Comment = db.comments;

module.exports = {
  createPost: async (req, res) => {
    const { id } = req.user;
    if (req.body.title !== undefined && req.body.body !== undefined) {
      const newPost = {
        ...req.body,
        user_id: id,
      };
      const post = await Posts.create(newPost);
      res.status(200).json({
        status: "success",
        post: post,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "there have no content on title or body",
      });
    }
  },
  getAllPost: async (req, res) => {
    const posts = await Posts.findAll({
      attributes: { exclude: ["user_id"] },
      include: [
        {
          model: User,
          as: "user", //same as models/index.js
          attributes: ["name", "email"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["name", "comment"],
        },
      ],
    });
    if (posts.length > 0) {
      res.status(200).json({
        status: "success",
        posts: posts,
      });
    } else {
      res.status(203).json({
        status: "failed",
        message: "no post found",
      });
    }
  },
  getPostById: async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          as: "user", //same as models/index.js
          attributes: ["name", "email"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["name", "comment"],
        },
      ],
      attributes: { exclude: ["user_id"] },
    });
    if (post !== null) {
      res.status(200).json({
        status: "success",
        post: post,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "post not found",
      });
    }
  },
  editPost: async (req, res) => {
    const id = req.params.id;
    try {
      const updatePost = await Posts.update(req.body, { where: { id: id } });
      if (updatePost[0] === 1) {
        res.send("post updated successfully");
      }
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    const id = req.params.id;
    const result = await Posts.destroy({ where: { id: id } });
    if (result === 1) {
      res.status(200).json({
        message: "post deleted successfully",
      });
    } else {
      res.status(400).json({
        error: "there have some error",
      });
    }
  },
};
