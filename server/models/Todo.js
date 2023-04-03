// work w/ mongodb
const mongoose = require('mongoose')

// schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    id: {
        type: String
    },
    familyList: {
        type: String,
    },
    statusSelected: {
        type: Boolean,
        default: false,
    },
    statusImportant: {
        type: Boolean,
        default: false,
    },
    moreOption: {
        type: Boolean,
        default: false,
    },
    editOption: {
        type: Boolean,
        default: false,
    },
    removeOption: {
        type: Boolean,
        default: false,
    },
    userEmail: {
        type: String
    }
});

module.exports = mongoose.model('Todo', todoSchema)