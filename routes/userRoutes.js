const router = require('express').Router();
const userController = require('../controllers/userController');
const verifyAdmin = require('../lib/verifyAdmin');
const verifyToken = require('../lib/verifyToken');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/all', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.editUser)
router.put('/update/:id', verifyToken, verifyAdmin, userController.updateUserByAdmin)
router.delete('/:id', userController.deleteUser)


module.exports = router;