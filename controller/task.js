import errorHandler from "../middlewares/error.js";
import { task } from "../models/task.js"

export const createTask = async (req, res)=>{
    try {
        const { title, description } = req.body;
        await task.create({
            title,
            description,
            user: req.user
        })
        res.status(200).json({
            success: true,
            message: "task is created successfully"
        })
    } catch (error) {
        next(error);
    }

}

export const getTasks = async (req, res)=>{
    try {
        const allTasks = await task.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            tasks: allTasks
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next)=>{
    try {
        const findTask = await task.findOne({ _id: req.params.id });
        if (!findTask) return next(new errorHandler("invalid id", 400));
        findTask.isCompleted = !findTask.isCompleted;
        console.log(findTask.isCompleted)
        await findTask.save();
        res.status(200).json({
            success: true,
            message: "task is updated successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const deleteTask = async (req, res, next)=>{
    try {
        const findTask = await task.findOne({ _id: req.params.id });
        if (!findTask) return next(new errorHandler("invalid id", 400));
        await findTask.deleteOne();
        res.status(200).json({
            success: true,
            message: "task is deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}