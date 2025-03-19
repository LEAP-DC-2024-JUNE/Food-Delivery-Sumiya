import express from "express";
import connectDb from "./connect-db.js";
import { ObjectId } from "mongodb";
import cors from "cors";
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());
connectDb();
app.get("/", (request, respond) => {
  respond.json("Hello World!");
});
app.post("/create-user", async (request, response) => {
  let db = await connectDb();
  try {
    const { email, age, phoneNumber } = request.body;
    if (!email || !age || !phoneNumber) {
      return response.status(400).json({
        status: "fail",
        message: "Please some field is missing",
      });
    }
    let result = await db.insertOne({
      email,
      age,
      phoneNumber,
    });
    response.json(result);
  } catch (error) {
    response.json(error);
  }
});
app.get("/get-all-users", async (request, response) => {
  let db = await connectDb();
  try {
    let result = await db.find().toArray();
    response.json(result);
  } catch (error) {
    response.json(error);
  }
});
app.get("/get-user", async (request, response) => {
  let db = await connectDb();
  try {
    let result = await db.findOne(
      { name: "Sumiya" },
      { _id: "6799008593fd934b11ef1f7f" }
    );
    response.json(result);
  } catch (error) {
    response.json(error);
  }
});
app.put("/update-user", async (request, response) => {
  let db = await connectDb();
  const { phoneNumber, age, email, id } = request.body;
  try {
    let result = await db.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { email, phoneNumber, age } }
    );
    response.json(result);
  } catch (error) {
    response.json(error);
  }
});
app.delete("/delete-user", async (request, response) => {
  let db = await connectDb();
  try {
    let result = await db.findOneAndDelete({
      _id: new ObjectId("6799054e93fd934b11ef1f81"),
    });
    response.json(result);
  } catch (error) {
    response.json(error);
  }
});
app.listen(PORT, () => {
  console.log("server started running running on 3001");
});
