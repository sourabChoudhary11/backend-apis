import express from "express";
import { isAuthentication } from "../middlewares/middleware.js";
import { createTask, getTasks, deleteTask, updateTask } from "../controller/task.js";

export const taskRouter = express.Router();

taskRouter.post("/new", isAuthentication, createTask);

taskRouter.get("/all", isAuthentication, getTasks);

taskRouter.route("/:id").put(isAuthentication, updateTask).delete(isAuthentication, deleteTask);
