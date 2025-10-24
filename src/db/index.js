import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../utils/constants.js";

dotenv.config();

let dbInstance = undefined;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
    );

    dbInstance = connectionInstance;

    // console.log("DB: ", dbInstance);

    console.log(
      `\n☘️ MongoDB Connected DB Host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
