import app from "./src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
});