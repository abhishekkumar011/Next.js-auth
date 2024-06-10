import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/next-auth`!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", () => {
      console.log("MongoDB connection error, please make sure db is up and runnig");
      process.exit(1);
    });

  } catch (error) {
    console.log("MONGODB connection failed! ", error);
    process.exit(1);
  }
}
