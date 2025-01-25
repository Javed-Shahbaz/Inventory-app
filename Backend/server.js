const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
// Connecting to MongoDb database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever is Running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Sever Error", err.message);
  });
