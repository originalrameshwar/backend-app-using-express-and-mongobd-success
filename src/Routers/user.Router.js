const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getMe,
} = require('../Controllers/user.Controller.js')
const { protect } = require('../Middleware/auth.middleware.js');
const { route } = require('./todo.Router.js');

router.post('/', registerUser)
router.post('login', loginUser)
router.get('/me', protect, getMe)

module.exports = router;