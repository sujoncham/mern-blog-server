import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))


import User from '../model/user.model.js';
const saltRounds = 10;


export const getAllUsers = async(req, res, next)=>{
    let users;
    try {
        users = await User.find({});
    } catch (error) {
        console.log(error)
    }

    if(!users){
        return res.status(404).json({
            status: "failed",
            message: "user not found"
        })
    }
    return res.status(200).json({
        status: 'success',
        message: 'found all users', 
        data: users,
    })
};

export const signup = async(req, res, next)=>{
    console.log(req.body)
   try {
    const user = await User.findOne({username:req.body.username});
    const email = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('user already exists');
    if(email) return res.status(400).send('email already exists');

    bcrypt.hash(req.body.password, saltRounds, async(err, hash)=> {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            blogs: [],
        }); 

        await newUser.save().then((user)=>{
           return res.status(200).json({
                status: "success",
                message: "user is created successfully",
                user: {
                    id: user._id,
                    username: user.username,
                }
            })
        })
        .catch((error)=>{
           return res.send({
                status: "failed",
                message: "user is not created",
                error: error,
            })
        })
    });
    
} catch (error) {
    return res.send({
        status: "failed",
        message: "user is not created",
        error: error,
    })
}

}
export const login = async(req, res, next)=>{
   try {
    const user = await User.findOne({email:req.body.email});
    // console.log(user)
    if(!user) {
       return res.status(401).send({
        success: false,
        message: 'email not found',
       })
    } 

    if(!bcrypt.compareSync(req.body.password, user.password)){
        return res.status(401).send({
            success: false,
            message: 'Incorrect password',
           })
    }

    const payload = {
        id: user._id,
        username: user.username,
    }

    const token = jwt.sign(payload, process.env.SECRET_TOKEN_KEY, {
        expiresIn: '2d'
       })

   return res.status(200).send({
        success: true,
        message: 'user is logged in successfully',
        token: ("Bearer "+token).split(' ')[1],
        username: user.username,
        id: user._id,
        email: user.email,
        token: token,
    })
   } catch (error) {
    return res.status(400).send({
        success: false,
        message: 'user logged is failed',
        error: error.message,
    })
   }
}

export const profileUpdate = async(req, res, next)=>{
    console.log(req.body)
    try {
        const {username, email, description, address, phone, hobby, vision} = req.body;
        const userId = req.params.id;
        const user = await User.findByIdAndUpdate(userId, {
            username, email, description, address, phone, hobby, vision 
        });

        return res.status(200).json({
            status: "success",
            message: "update user by id successfully",
            data: user,
        })
    } catch (error) {
        console.log(error)
    }
};
export const profileImgUpdate = async(req, res, next)=>{
    // console.log(req.files)
    
    try {
        const bannerImg = req.files.bannerImg[0].filename;
        const profileImg = req.files.profileImg[0].filename;
        console.log(bannerImg, profileImg)
        const userId = req.params.id;
        const userImg = await User.findByIdAndUpdate(userId, {
            bannerImg, profileImg, 
        });

        return res.status(200).json({
            status: "success",
            message: "update image by id successfully",
            data: userImg,
        })
    } catch (error) {
        console.log(error)
    }
};

export const profileImgId = async(req, res)=>{
    const { img } = req.params;
    return res.sendFile(path.join(__dirname, `./uploads/${img}`));
};

export const getProfileById = async(req, res, next)=>{
    
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate('blogs');

         return res.status(200).json({
            status: "success",
            message: "get user by id successfully",
            user: user,
        })
    } catch (error) {
        console.log(error)
    }
};

//follow a user

export const follow = async(req, res, next)=>{
    // console.log(req.body)
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  };
  
  //unfollow a user
  
export const unFollow = async(req, res, next)=>{
      if (req.body.userId === req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
    };
