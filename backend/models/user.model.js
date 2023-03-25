const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    dp: {
        type: String
    },
    _id: {
        type: String,
        required: true
    }
},
{
    timestamps:true
})

const User = mongoose.model('User', userSchema)

module.exports = User