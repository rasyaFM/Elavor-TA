import mongoose from "mongoose";

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;

const uri = `mongodb+srv://${user}:${pass}@elrasya.ugovzcj.mongodb.net/ELRASYA`;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;