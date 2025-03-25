import mongoose from "mongoose";
import dotenv from 'dotenv';
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI || '';

// app.listen(PORT, () => console.log("App is listinging"))

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("DB connected")
    app.listen(PORT, () => console.log("App is listinging", PORT))
})
.catch((err) => {
    console.log("Error in connection:", err);
    process.exit(1);
})
