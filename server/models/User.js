// work w/ mongodb
const mongoose = require('mongoose')

const isEmail = require('validator/lib/isEmail')

// shema
const userSchema = new mongoose.Schema({
    // name: {
    //     type: String
    // },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: isEmail,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

module.exports = mongoose.model('User', userSchema)