const asyncHandler = require('express-async-handler')

const Todo = require('../Models/todo.Modle.js')
const User = require('../Models/user.Modle.js')


// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ user: req.user.id })
    res.status(200).json(todos)
})

// @desc Set goal
// @route POST /api/goals
// @access  Private
const setTodo = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('text is required')
    }

    const todo = await Todo.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(todo)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error('Todo not found')        
    }

    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the Logged in user matches the Todo user
    if(todo.user.toString() !==req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateTodo = await Todo.findByAndUpdate(req.params.id,req.body, {
        new: true
    })

    res.status(200).json(updateTodo)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteTodo = asyncHandler(async(req,res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(404)
        throw new Error('Todo not found')
    }

    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the Todo user
    if(todo.user.toString()!==req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await todo.remove()

    res.status(200).json({id:req.user.id})
})

module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo
}