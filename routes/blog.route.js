import express from "express";
import { commentBlog, createBlog, deleteBlog, getAllBlogs, getByIdBlog, getByUserIdBlog, likeBlog, updateBlog } from "../controllers/blog.controller.js";

const routerBlog = express.Router();

routerBlog.get('/', getAllBlogs);
routerBlog.post('/createBlog', createBlog);
routerBlog.patch('/updateBlog/:id', updateBlog);
routerBlog.patch('/:id/like', likeBlog);
routerBlog.patch('/:id/comment', commentBlog);
routerBlog.get('/:id', getByIdBlog);
routerBlog.get('/user/:id', getByUserIdBlog);
routerBlog.delete('/:id', deleteBlog);


export default routerBlog;