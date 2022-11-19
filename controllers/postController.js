const db = require("../modles");

const Posts = db.posts;
const User = db.users;

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
        include: [
            {
              model: User,
              as: "user", //same as models/index.js
              attributes: ['name', 'email']
            },
          ]
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
          attributes: ['name', 'email']
        },
      ],
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
  editPost: async (req, res) => {},
  deletePost: async (req, res) => {},
};
