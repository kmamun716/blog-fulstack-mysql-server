const router = require('express').Router();
const commentController = require('../controllers/commentController');

router.post('/create', commentController.createComment)
router.get('/all', commentController.getAllComment)
router.get('/:id', commentController.getCommentById)
router.put('/:id',commentController.editComment)
router.delete('/:id',commentController.deleteComment)


module.exports = router;