const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser);
app.use(bodyParser.json());

//Routes Middleware
app.use("/api/users", userRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
//Error Middleware
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
// Connecting to MongoDb database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever is Running on port ${PORT} \nConnected to MongoDB`);
    });
  })
  .catch((err) => {
    console.log("Sever Error", err.message);
  });
