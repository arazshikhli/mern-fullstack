import mongoose, { Schema, Types } from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }]
},
{
    timestamps:true
}
)
export default mongoose.model('User',UserSchema)

