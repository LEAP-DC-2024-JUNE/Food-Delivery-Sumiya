import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sumiyagombo840:sword1stone1@fooddelivery.wirf8.mongodb.net/"
    );
    console.log(
      `Connected to MongoDB on ${"mongodb+srv://sumiyagombo840:sword1stone1@fooddelivery.wirf8.mongodb.net/"}`
    );
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDb;
