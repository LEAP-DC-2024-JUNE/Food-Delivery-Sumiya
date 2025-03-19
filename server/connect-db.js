import { MongoClient } from "mongodb";
const connectDb = async () => {
  const client = new MongoClient(
    "mongodb+srv://duluuf:LM7miFmm6q0eg0Qa@cluster1.pyncrqd.mongodb.net/"
  );
  let connection;
  try {
    connection = await client.connect();
    console.log("amjilttai");
  } catch {
    console.error(error);
  }
  return connection.db("sumiya").collection("users");
};

export default connectDb;
