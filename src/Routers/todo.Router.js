const express = require('express')
const router = express.Router();

const {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo,
} = require('../Controllers/todo.Controller.js')

const { protect } = require('../Middleware/auth.middleware.js')

router.route('/').get(protect, getTodos).post(protect, setTodo)
router.route('/:id').delete(protect, deleteTodo).put(protect, updateTodo)

module.exports = router;