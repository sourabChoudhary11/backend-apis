
import { user } from "../models/model.js";
import bcrypt from 'bcrypt'
import { setCookie } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await user.find({});

        res.json({
            status: true,
            users
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const emailMatch = await user.findOne({ email }).select("+password");
        if (!emailMatch) return next(new errorHandler("invalid login or password", 400));
        const comparePassword = await bcrypt.compare(password, emailMatch.password);

        if (!comparePassword) return next(new errorHandler("invalid login or password", 404))
        setCookie(`Welcome back, ${emailMatch.name}`, 200, emailMatch, res)
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new errorHandler("login first", 400));
    res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "logout successfully"
    })
}

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        const findUser = await user.findOne({ email });
        if (findUser) return next(new errorHandler("user already registered", 400))
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await user.create({
            name,
            email,
            password: hashedPassword
        })

        setCookie("Registered Successfully", 201, createUser, res)
    } catch (error) {
        next(error)
    }

}

export const getSpecificUser = async (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    })
}

export const deleteALl = async () => {
    try {
        await user.deleteMany({});
    } catch (error) {
        next(error);
    }
}