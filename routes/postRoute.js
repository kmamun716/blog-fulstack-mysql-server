const router = require('express').Router();
const postController = require('../controllers/postController');
const verifyToken = require('../lib/verifyToken');

router.post('/create', verifyToken, postController.createPost)
router.get('/all', postController.getAllPost)
router.get('/:id', postController.getPostById)
router.put('/:id', verifyToken, postController.editPost)
router.delete('/:id', verifyToken, postController.deletePost)


module.exports = router;