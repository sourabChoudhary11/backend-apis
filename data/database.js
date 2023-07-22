import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(process.env.database_URI, {
        dbName: 'arrays'
    }).then(() => {
        console.log("Connected")
    }).catch((e) => {
        console.log(e)
    });
}