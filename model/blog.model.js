import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    // category:{
    //     type:String,
    //     required:true
    // },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    
    comments:{
        type: Array,
        default: [],
    },
    likes: {
        type: Array,
        default: [],
      },
    date:{
        type:Date,
        default: Date.now,
    }
});


// create model

const Blog = mongoose.model("blog", blogSchema);

export default Blog;
