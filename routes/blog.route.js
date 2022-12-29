import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getByIdBlog, getByUserIdBlog, updateBlog } from "../controllers/blog.controller.js";

const routerBlog = express.Router();

routerBlog.get('/', getAllBlogs);
routerBlog.post('/createBlog', createBlog);
routerBlog.patch('/updateBlog/:id', updateBlog);
routerBlog.get('/:id', getByIdBlog);
routerBlog.get('/user/:id', getByUserIdBlog);
routerBlog.delete('/:id', deleteBlog);


export default routerBlog;