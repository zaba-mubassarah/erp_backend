import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import issueRoutes from "./routes/issues.js";
import usersRoute from "./routes/users.js";
import signUpRoutes from "./routes/signUp.js";
import loginRoutes from "./routes/login.js";
const app = express();
dotenv.config();
import cors from "cors";

const PORT = 5000;
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost/mydb", {
   
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.use("/issues", cors(), issueRoutes);
app.use("/users", cors(), usersRoute);
app.use("/signup", cors(), signUpRoutes);
app.use("/login", cors(), loginRoutes);
app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
