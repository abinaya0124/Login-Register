const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", cors({ origin: "http://localhost:5173", credentials: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGO DB connected successfully"))
  .catch((err) => console.log(err));

app.use("/", require("./Routes/Routes.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on Port ${PORT}`));
