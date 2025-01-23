import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sumiyagombo840:sword1stone1@fooddelivery.wirf8.mongodb.net/"
    );
    console.log("connected to MongoDb");
  } catch {
    console.error(error);
  }
};
export default connectDb;
