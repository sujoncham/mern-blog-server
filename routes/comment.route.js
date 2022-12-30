import express from "express";
import { createComment, deleteComment, getAllComments, getByIdComment } from "../controllers/comment.controller.js";

const routerComment = express.Router()

routerComment.get("/", getAllComments);
routerComment.post("/createComment", createComment);
routerComment.get("/:id", getByIdComment);
routerComment.delete("/:id", deleteComment);

export default routerComment;