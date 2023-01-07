import express from "express";
import multer from 'multer';
import { follow, getAllUsers, getProfileById, login, profileImgId, profileImgUpdate, profileUpdate, signup, unFollow } from "../controllers/user.controller.js";

const routerUser = express.Router();

const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads/")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
})

// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowd"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
});

const cpUpload = upload.fields([{ name: 'bannerImg' }, { name: 'profileImg' }]);

routerUser.get('/', getAllUsers);
routerUser.post('/signup', signup);
routerUser.post('/login', login);
routerUser.patch('/profileUpdate/:id', profileUpdate);
routerUser.patch('/profileImgUpdate/:id', cpUpload, profileImgUpdate);
routerUser.get('/profileImgId/:img', profileImgId);
routerUser.get('/profile/:id', getProfileById);
routerUser.patch('/profile/:id/follow', follow);
routerUser.patch('/profile/:id/unFollow', unFollow);


export default routerUser;