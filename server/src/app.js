require("dotenv").config();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");

const indexRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use(express.static(path.resolve(__dirname, "../../dist")));

module.exports = app;
