import { Router } from "express";
import {register,login,getMe} from "../controllers/auth.js";
import { createPost,
     getAllPosts, 
     getMyPosts, 
     getPostById,
    removePost
    } from "../controllers/posts.js";
import { checkAuth } from "../utils/check.js";
const router=new Router();


//Create Post
//http://localhost:3002/api/posts
router.post('/',checkAuth,createPost)
//get All Posts
router.get('/',getAllPosts)

//get Post by id
//http://localhost:3002/api/posts/:id
router.get('/:id',getPostById)

//get my Posts
//http://localhost:3002/api/posts/user/me
router.get('/user/me',checkAuth,getMyPosts)

//Remove Post
//http://localhost:3002/api/posts/:id
router.delete('/:id',checkAuth,removePost)
export default router;