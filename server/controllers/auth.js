import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//Register User
export const register=async (req,res)=>{
    try {
        const {username,email,password}=req.body;
        const isUsed=await User.findOne({username});
        if(isUsed){
            return res.json({
                message:'Данный username уже занят'
            })
        }
        
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(password,salt);
        const newUser=new User({
            username,
            email,
            password:hash,
         
        });
        const token=jwt.sign({
            id:newUser._id
        },process.env.JWT_SECRET,{expiresIn:'30d'})

        await newUser.save();
        res.json({newUser,token,message:'Регистрация прошла успешно'})
    } catch (error) {
        res.json({message:'Ошибка при создании пользователя'})
    }
}
//Login User
export const login=async (req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            console.log(res)
            return res.json({
                message:`Пользователь с логином "${username}" не найден или введен неверный пароль`
            })
        }
        const isPassCorrect=await bcrypt.compare(password,user.password);
        if (!isPassCorrect){
            return res.json({
                message:'Введен неверный пароль'
            })
        }
        const token=jwt.sign({
            id:user._id
        },process.env.JWT_SECRET,{expiresIn:'30d'})

        res.json({token,user,
            message:"Авторизация прошла успешно"
        })
    } catch (error) {
        res.json({message:'Ошибка при авторизации'})
    }
}

//Get ME
export const getMe=async (req,res)=>{
    try {
        const user=await User.findById(req.userId);
        if(!user){
            return res.status(404).json({
                message:'Не найден пользователь с таким username'
            })
        }
        const token=jwt.sign({
            id:user._id
        },process.env.JWT_SECRET,{expiresIn:'30d'})
        res.json({user,token})
 
    } catch (error) {
        res.json({
            message:'Нет доступа'
        })
    }
}
