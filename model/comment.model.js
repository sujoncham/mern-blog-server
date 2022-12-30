import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    blogs: {
        type: mongoose.Types.ObjectId,
        ref: "blog",
        required: true,
    },
    commentDate: {
        type: Date,
        default: Date.now,
    }
})

const Comment = mongoose.model('comment', commentSchema);
export default Comment;