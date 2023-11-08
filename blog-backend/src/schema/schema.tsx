const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const bcrypt = require("bcryptjs");
// Custom Imports
const User = require("../models/userModel");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

// User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

// Blog Type
const BlogType = new GraphQLObjectType({
  name: "Blog",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    date: { type: GraphQLString },
    // updatedAt: { type: GraphQLString },
    // user: {
    //   type: UserType,
    //   resolve(parent, args) {
    //     return User.findById(parent.user);
    //   },
    // },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // For Users
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        return await User.find();
      },
    },
    // For Blogs
    blogs: {
      type: new GraphQLList(BlogType),
      async resolve(parent, args) {
        return await Blog.find();
      },
    },
    // For Comments
    comments: {
      type: new GraphQLList(CommentType),
      async resolve(parent, args) {
        return await Comment.find();
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a User
    signup: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, email, password }) {
        const encryptedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          name,
          email,
          password: encryptedPassword,
        });
        return await user.save();
      },
    },
    // Login a User
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
