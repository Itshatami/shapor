import mongoose from "mongoose";


export default function connectToDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("error db -> ", err.message));
}
