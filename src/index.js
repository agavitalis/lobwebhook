import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 3500;
const dbConnectionString = "mongodb://localhost:27017/lobwebhooks"
app.use(express.json());
app.use(cors());

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", console.error.bind(console, "Connection Error:"));

app.listen(PORT,(error) => {
  console.log(`Speak Lord, your servant is listening to port ${PORT}`);

  if(error){
    console.log(error);
  }
})
