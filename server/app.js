import express from "express";
import connectDb from "./connect-db.js";
const app = express();
const PORT = 3001;
connectDb();
app.listen(PORT, () => {
  console.log("server started running running on 3001");
});
