import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
    }
}