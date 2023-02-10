import mongoose, { Schema, Types } from "mongoose";

const PostSchema=new Schema({
    username:{type:String,required:true},
    title:{type:String,required:true},
    text:{type:String,required:true},
    imgUrl:{type:String,default:''},
    views:{type:Number,default:0},
    author:{type:Types.ObjectId,ref:'User'},
    coments:[{type:Types.ObjectId,ref:'Comment'}]
},
{timestamps:true})

export default mongoose.model("Post",PostSchema)