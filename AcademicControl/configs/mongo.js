import mongoose from "mongoose";

export default async function connection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Academic", {});
    console.log("Database connected!");
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}