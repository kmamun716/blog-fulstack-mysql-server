const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/create', postController.createPost)
router.get('/all', postController.getAllPost)
router.get('/:id', postController.getPostById)
router.put('/:id', postController.editPost)
router.delete('/:id', postController.deletePost)


module.exports = router;