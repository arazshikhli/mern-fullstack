import Post from '../models/Post.js';
import User from '../models/User.js';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';

//create Post

export const createPost=async (req,res)=>{
    try {
        const {title,text}=req.body;
        const user=await User.findById(req.userId);
        if(req.files){
            let fileName=Date.now().toString()+req.files.image.name
            const __dirname=dirname(fileURLToPath(import.meta.url));
        
            req.files.image.mv(path.join(__dirname,'..','uploads',fileName));
            const newPostWithImage=new Post({
                username:user.username,
                title,
                text,
                imgUrl:fileName,
                author:req.userId
            })
            await newPostWithImage.save();
            await User.findByIdAndUpdate(req.userId,{
                $push:{posts:newPostWithImage},
            })
            return res.json(newPostWithImage)
        }
        const postWithoutImage=new Post({
            username:user.username,
            title,
            text,
            author:req.userId,
            imgUrl:''
        })
        await postWithoutImage.save();
        await User.findByIdAndUpdate(req.userId,{
            $push:{posts:postWithoutImage}
        })
        console.log(postWithoutImage)
        res.json(postWithoutImage)

    } catch (error) {
        res.json({
            message:"Чтото пошло не так"
        })
    }
}

//Get all posts

export const getAllPosts=async(req,res)=>{
    try {
        const allPosts=await Post.find().sort('-createdAt');
        const popularPosts=await Post.find().limit(5).sort('-views');
        if(!allPosts){
            return res.json({
                message:"Нет постов"
            })
        }
        res.json({allPosts,popularPosts})
        
    } catch (error) {
        res.json('Чтото пошло не так')
    }
}

//Get all posts

export const getPostById=async(req,res)=>{
    try {
       const post=await Post.findByIdAndUpdate(req.params.id,{
        $inc:{views:1},
       })
       res.json(post)
        
    } catch (error) {
        res.json({
            message:'Чтото пошло не так'
        })
    }
}


export const getMyPosts=async(req,res)=>{
    try {
        const user=await User.findById(req.userId)
        const list=await Promise.all(
            user.posts.map((post)=>{
                return Post.findById(post._id)
            })
        )
        res.json(list)
        
    } catch (error) {
        
    }
}

//Remove Post
export const removePost=async(req,res)=>{
    try {
    const post=await Post.findByIdAndDelete(req.params.id)
    if(!post){
        return res.json({
            message:"Takoqo posta net"
        })
        await User.findByIdAndUpdate(req.userId,{
            $pull:{posts:req.params.id}
        })
        res.json({
            message:"Пост был удален"
        })
    }
        
    } catch (error) {
        console.log(error)
    }
}