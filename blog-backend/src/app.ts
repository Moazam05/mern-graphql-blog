const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
// Custom Imports
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const UserSchema = require("./graphql/schema/userSchema");
const BlogSchema = require("./graphql/schema/blogSchema");
const CommentSchema = require("./graphql/schema/commentSchema");

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

// GraphQL ROUTES
app.use("/graphql/users", graphqlHTTP({ schema: UserSchema, graphiql: true }));
app.use("/graphql/blogs", graphqlHTTP({ schema: BlogSchema, graphiql: true }));
app.use(
  "/graphql/comments",
  graphqlHTTP({ schema: CommentSchema, graphiql: true })
);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
