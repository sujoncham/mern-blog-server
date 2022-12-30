import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

export const getProfileById = async(req, res, next)=>{
    
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

         return res.status(200).json({
            status: "success",
            message: "get user by id successfully",
            user: user,
        })
    } catch (error) {
        console.log(error)
    }
};
