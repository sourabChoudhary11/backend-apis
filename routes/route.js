import express from "express";
import { login, register, getAllUsers, getSpecificUser, deleteALl, logout } from "../controller/user.js";
import { isAuthentication } from "../middlewares/middleware.js"

const router = express.Router();

router.get("/all", getAllUsers)

router.post("/login", login)

router.get("/logout", logout)

router.post("/new", register)

router.get("/me", isAuthentication, getSpecificUser)

router.delete("/deleteUsers", deleteALl)



export default router;