const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/all', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.editUser)
router.delete('/:id', userController.deleteUser)


module.exports = router;