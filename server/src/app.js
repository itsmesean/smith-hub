require("dotenv").config();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const indexRouter = require("./routes/index");

const app = express();

app.use(compression());
app.use(helmet());

/**
 * req parsers
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * cors
 */
const isProduction = process.env.NODE_ENV === "production";
const origin = {
  origin: isProduction ? "https://www.smith-hub.com" : "*",
};
app.use(cors(origin));

/**
 * static
 */
app.use("/dist", express.static(path.resolve(__dirname, "../../dist")));

app.use("/api", indexRouter);

if (process.env.NODE_ENV === "production") {
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
  });
  app.use(limiter);

  app.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../../dist/index.html"));
  });
}

module.exports = app;
