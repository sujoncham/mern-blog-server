import express from "express";
import { getAllUsers, login, signup } from "../controllers/user.controller.js";

const routerUser = express.Router();

routerUser.get('/', getAllUsers);
routerUser.post('/signup', signup);
routerUser.post('/login', login);


export default routerUser;