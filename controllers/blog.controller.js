import mongoose from 'mongoose';
import Blog from '../model/blog.model.js';
import User from '../model/user.model.js';


export const getAllBlogs = async(req, res, next)=>{
    
    try {
        const blogs = await Blog.find().populate('user');
        if(!blogs){
            return res.send({
                status: "failed",
                message: "blog is not found",
                error: error,
            })
        }

         return res.status(200).json({
            status: "success",
            message: "blog is created successfully",
            data: blogs,
        })
    } catch (error) {
        console.log(error)
    }

};

export const createBlog = async(req, res, next)=>{
    // console.log(req.body)
    const {title, description, image, user} = req.body;
    let existUser;
    try {
        existUser = await User.findById(user).populate('blogs');
    } catch (error) {
        return console.log(error)
    }
    if(!existUser){
        return res.status(400).json({message: "user not found"})
    }
    const newBlog = new Blog({
        title,
        description,
        image,
        user,
    }); 

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existUser.blogs.push(newBlog);
        await existUser.save({session});
        await session.commitTransaction();
    } catch (error) {
    return res.send({
        status: "failed",
        message: "blog is not created",
        error: error,
    })
    }
    return res.status(200).json({
        status: "success",
        message: "blog created successfully",
        data: newBlog,
    })

    }

export const updateBlog = async(req, res, next)=>{
    
    try {
        const {title, description, image} = req.body;
        const blogId = req.params.id;
        const blog = await Blog.findByIdAndUpdate(blogId, {
            title, 
            description, 
            image, 
        });

        return res.status(200).json({
            status: "success",
            message: "update by id successfully",
            data: blog,
        })
    } catch (error) {
        console.log(error)
    }
};


export const getByIdBlog = async(req, res, next)=>{
    
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId).populate('user');

         return res.status(200).json({
            status: "success",
            message: "get by id successfully",
            user: blog,
        })
    } catch (error) {
        console.log(error)
    }
};

export const getByUserIdBlog = async(req, res, next)=>{
    
    try {
        const userId = req.params.id;
        const userBlog = await User.findById(userId).populate('blogs');

         return res.status(200).json({
            status: "success",
            message: "get blog by userid successfully",
            data: userBlog,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: "failed",
            message: "not get blog by userid",
            error: error.message,
        })
    }
};

export const deleteBlog = async(req, res, next)=>{
    
    try {
        const blogId = req.params.id;
         await Blog.findByIdAndRemove(blogId);

         return res.status(200).json({
            status: "success",
            message: "deleted blog by id successfully",
        })
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: "not deleted blog",
            error: error.message,
        })
    }

};

//like / dislike a post

export const likeBlog = async(req, res, next)=>{
    console.log(req.body)
    try {
      const post = await Blog.findById(req.params.id);
      if (!post.likes.includes(req.body.user)) {
        await post.updateOne({ $push: { likes: req.body.user } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.user } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  
  
export const commentBlog = async(req, res, next)=>{
    // console.log(req.body)
    try {
      const post = await Blog.findById(req.params.id);
            await post.updateOne({$push:{comments:{ comments:req.body.comments, date: new Date()}}});
        
        res.status(200).json("The post has been commented");  
    } catch (err) {
      res.status(500).json(err);
    }
  };