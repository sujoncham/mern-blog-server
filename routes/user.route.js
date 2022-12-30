import express from "express";
import { getAllUsers, getProfileById, login, profileUpdate, signup } from "../controllers/user.controller.js";

const routerUser = express.Router();

routerUser.get('/', getAllUsers);
routerUser.post('/signup', signup);
routerUser.post('/login', login);
routerUser.patch('/profileUpdate/:id', profileUpdate);
routerUser.get('/profile/:id', getProfileById);


export default routerUser;