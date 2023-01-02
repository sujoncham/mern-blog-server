import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category:{
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
})

const Category = mongoose.model('category', categorySchema);
export default Category;