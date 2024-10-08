import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"

const userSchema=new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
   fullName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    avatar:{
            type:String,//cloudnary url
            required:true,
    },
    coverImage:{
        type:String,//cloudnary url
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video",
    },
    password:{
        type:String,
        required:[true,'password is required']//custom message on error
    },
    refreshToken:{
        type:String,
    }


},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken=async function(){
    return jwt.sign(
        {
        _id:this._id,//mongoDB se _id mil jaata h
        email:this.email,
        userName:this.userName,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOCKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken=async function(){
    return jwt.sign(
        {
        _id:this._id,//mongoDB se _id mil jaata h
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOCKEN_EXPIRY
    }
)
}

export const User=mongoose.model("User",userSchema);