import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: [true, 'already exist this username'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    blogs:[{
        type: mongoose.Types.ObjectId,
        ref: 'blog',
        required: true,
    }],
    comments:[{
        type: mongoose.Types.ObjectId,
        ref: 'comment',
        required: true,
    }],
})

const User = mongoose.model('user', userSchema);
export default User;