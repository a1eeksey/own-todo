// work w/ mongodb
const mongoose = require('mongoose')

// schema
const listSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    id: {
        type: String
    },
    userEmail: {
        type: String
    }
});

module.exports = mongoose.model('List', listSchema)