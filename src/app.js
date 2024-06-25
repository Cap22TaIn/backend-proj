import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"})) //16kb se jada json nhi accept krega json form se aaya data except krne k liye
app.use(express.urlencoded({extended:true,limit:"16kb"}));//ye url se aaya data accept krega
app.use(express.static("public"));//ye apne server me hi data store krta h public file me store krega
app.use(cookieParser());
//middleware is checking to check if req is valid or not app.get--->(err,req,res,next) ye next middleware k liye h ye condition check krta h fir bolta h mera kaam ho gya next checking kro

export {app};