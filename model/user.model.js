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
    description: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    hobby: {
        type: String,
        default: "",
    },
    vision: {
        type: String,
        default: "",
    },
    bannerImg: {
        type: String,
        default: "",
    },
    profileImg: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
      },
      followings: {
        type: Array,
        default: [],
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
},{ 
    timestamps: true
 })

const User = mongoose.model('user', userSchema);
export default User;