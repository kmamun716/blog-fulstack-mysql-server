const router = require('express').Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../lib/verifyToken');

router.post('/create', verifyToken, commentController.createComment)
router.get('/all', commentController.getAllComment)
router.get('/:id', commentController.getCommentById)
router.put('/:id', verifyToken, commentController.editComment)
router.delete('/:id', verifyToken, commentController.deleteComment)


module.exports = router;