import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import { config } from "dotenv";

config({
    path:"./data/config.env"
})

connectDB();

app.listen(4040, () => {
    console.log("Server start...")
})