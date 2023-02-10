import { Router } from "express";
import {register,login,getMe} from "../controllers/auth.js";
import { createPost } from "../controllers/posts.js";
import { checkAuth } from "../utils/check.js";
const router=new Router();


//Create Post
//http://localhost:3002/api/posts
router.post('/',checkAuth,createPost)


export default router;