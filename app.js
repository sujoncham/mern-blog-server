
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routerBlog from './routes/blog.route.js';
import routerComment from './routes/comment.route.js';
import routerUser from './routes/user.route.js';
dotenv.config()
const port = process.env.PORT || 5000;
// https://www.youtube.com/watch?v=TFGEq5OZgaA&t=86s
// https://i.ibb.co/P4jVD1J/extra-Volunteer.png

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/user', routerUser)
app.use('/api/blog', routerBlog)
app.use('/api/comment', routerComment)

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>console.log("DATABASE connected")).catch((err)=> console.log("error" + err.message))

app.get('/', (req, res)=>{
    console.log(`server start at port no ${port}`)
})
app.listen(port,()=>{
    console.log(`server start at port no ${port}`)
})