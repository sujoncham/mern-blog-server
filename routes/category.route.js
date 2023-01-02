import express from "express";
import { createCategory, deleteCategory, getAllCategory, getByIdCategory, updateCategory } from "../controllers/cate.controller.js";

const routerCategory = express.Router()

routerCategory.get("/", getAllCategory);
routerCategory.post("/createCategory", createCategory);
routerCategory.patch("/updateCategory/:id", updateCategory);
routerCategory.get("/:id", getByIdCategory);
routerCategory.delete("/:id", deleteCategory);

export default routerCategory;