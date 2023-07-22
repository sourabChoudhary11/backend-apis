import jwt from "jsonwebtoken"
import {user} from "../models/model.js"

export const isAuthentication = async (req,res,next)=>{
    const { token } = req.cookies;
    if (!token) return res.status(404).json({
        success: false,
        message: "login first"
    });
    const decordedId = jwt.verify(token, process.env.TOKE_SECRET)
    const yourProfile = await user.findById(decordedId);
    req.user = yourProfile
    next()
}