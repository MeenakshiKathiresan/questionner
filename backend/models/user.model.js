const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 6
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User