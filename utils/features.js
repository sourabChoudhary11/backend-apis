import jwt from "jsonwebtoken"

export const setCookie = async (message, status, user, res)=>{
    const token = await jwt.sign({ _id: user._id }, process.env.TOKE_SECRET);
    res.status(status).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "none",
        secure: true,
    }).json({
        status: true,
        message
    })
}