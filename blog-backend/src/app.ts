const express = require("express");
const { config } = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
// Custom Imports
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

// Dotenv config
config();

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.send("Blog MERN Graphql API is running...");
});

// ROUTES

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;