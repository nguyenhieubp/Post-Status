const express = require("express");
const cors = require("cors");
const app = express();
//ENV
require("dotenv").config();

//DB
const { connectDB } = require("./configs/db");
connectDB();

//CORS
app.use(cors());

//BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTER
const authRouter = require("./routers/auth.router");
const postRouter = require("./routers/post.router");
const { errorHandles } = require("./middleware/errorHandler");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);

//ERROR HANDLES
app.all("*", (req, res, next) => {
  const err = new Error("the route can not be found");
  err.statusCode = 404;
  next(err);
});
app.use(errorHandles);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log("backend-start");
});
