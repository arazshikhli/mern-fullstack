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