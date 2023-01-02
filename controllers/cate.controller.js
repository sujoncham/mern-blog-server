import Category from '../model/category.model.js';
import User from '../model/user.model.js';


export const getAllCategory = async(req, res, next)=>{
    
    try {
        const category = await Category.find();
        if(!category){
            return res.send({
                status: "failed",
                message: "category is not found",
                error: error,
            })
        }

         return res.status(200).json({
            status: "success",
            message: "category is created successfully",
            data: category,
        })
    } catch (error) {
        console.log(error)
    }

};

export const createCategory = async(req, res, next)=>{
    console.log(req.body)
    const {category, user} = req.body;
    const categCheck = await Category.findOne({category:req.body.category});
    if(categCheck) return res.status(400).send('category already exists');

    let existCate;
    try {
        existCate = await User.findById(user).populate('categories').populate('blogs');
    } catch (error) {
        return console.log(error)
    }
    if(!existCate){
        return res.status(400).json({message: "user not found"})
    }

    const newCate = new Category({
        category,
        user,
    }); 
    
    try { 
    const session = await mongoose.startSession();
        session.startTransaction();
        await newCate.save({session});
        existCate.categories.push(newCate);
        await existCate.save({session});
        await session.commitTransaction();
       
    } catch (error) {
        return res.send({
            status: "failed",
            message: "category is not created",
            error: error,
        })
    }
    return res.status(200).json({
        status: "success",
        message: "category created successfully",
        data: newCate,
    })  
}

export const updateCategory = async(req, res, next)=>{
    
    try {
        const {category} = req.body;
        const blogId = req.params.id;
        const cate = await Category.findByIdAndUpdate(blogId, {
            category, 
        });

        return res.status(200).json({
            status: "success",
            message: "update category by id successfully",
            data: cate,
        })
    } catch (error) {
        console.log(error)
    }
};


export const getByIdCategory = async(req, res, next)=>{
    
    try {
        const blogId = req.params.id;
        const cate = await Category.findById(blogId).populate('user');

         return res.status(200).json({
            status: "success",
            message: "get category by id successfully",
            user: cate,
        })
    } catch (error) {
        console.log(error)
    }
};

export const deleteCategory = async(req, res, next)=>{
    
    try {
        const blogId = req.params.id;
         await Category.findByIdAndRemove(blogId);

         return res.status(200).json({
            status: "success",
            message: "deleted category by id successfully",
        })
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: "not deleted blog",
            error: error.message,
        })
    }

};