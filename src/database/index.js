import mongoose from "mongoose";

const connectToDB = async () => {
  const connectingUrl = "mongodb://127.0.0.1:27017/MyEmptyBlog";
  await mongoose
    .connect(connectingUrl)
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log(error));
};

export default connectToDB;
