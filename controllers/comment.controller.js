import { default as Comment, default as Comments } from "../model/comment.model.js";
import User from "../model/user.model.js";



export const getAllComments = async(req, res, next)=>{
    
    try {
        const comments = await Comment.find().populate('user');
        if(!comments){
            return res.send({
                status: "failed",
                message: "comment not found",
                error: error,
            })
        }

         return res.status(200).json({
            status: "success",
            message: "comment fetch successfully",
            data: comments,
        })
    } catch (error) {
        console.log(error)
    }

};

export const createComment = async(req, res, next)=>{
    console.log(req.body)
    const {comment, username} = req.body;
    let existUser;
    try {
        existUser = await User.findById(username).populate('blogs').populate('comments');
    } catch (error) {
        return console.log(error.message)
    }
    if(!existUser){
        return res.status(400).json({message: "comment not created"})
    }
    const newComment = new Comment({
        comment,
        username,
    }); 

    try {
     
        await newComment.save();
        existUser.comments.push(newComment);
    } catch (error) {
        return res.send({
            status: "failed",
            message: "Comment is not created",
            error: error,
        });

    }
        return res.status(200).json({
        status: "success",
        message: "comment created successfully",
        data: newComment,
    })
 }

 export const getByIdComment = async(req, res, next)=>{
    
    try {
        const blogId = req.params.id;
        const blog = await Comment.findById(blogId).populate('users');

         return res.status(200).json({
            status: "success",
            message: "get comment by id successfully",
            user: blog,
        })
    } catch (error) {
        console.log(error)
    }
};

 export const deleteComment = async(req, res, next)=>{
    
    try {
        const blogId = req.params.id;
         await Comments.findByIdAndRemove(blogId);

         return res.status(200).json({
            status: "success",
            message: "deleted comments by id successfully",
        })
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: "not deleted blog",
            error: error.message,
        })
    }

};