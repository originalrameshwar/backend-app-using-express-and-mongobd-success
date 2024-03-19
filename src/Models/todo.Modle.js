const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'please add a text field']
    },

}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema);