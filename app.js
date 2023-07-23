import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/route.js";
import {taskRouter} from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.json());
app.use(cors({
   origin: [process.env.FRONTED_URI],
   methods: ["POST","GET", "PUT", "DELETE"],
   credentials:true
}))
app.use("/api/v1/tasks", taskRouter)
app.use("/api/v1/users/", router)

app.get("/", (req,res)=>{
    res.send("Home of our app")
})

app.use(errorMiddleware)



