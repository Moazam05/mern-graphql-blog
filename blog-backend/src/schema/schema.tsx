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
const AppError = require("../utils/appError");

// User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    blogs: {
      type: new GraphQLList(BlogType),
      async resolve(parent, args) {
        return await Blog.find({ user: parent.id });
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      async resolve(parent, args) {
        return await Comment.find({ user: parent.id });
      },
    },
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
    updatedAt: { type: GraphQLString },
    user: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.user);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      async resolve(parent, args) {
        return await Comment.find({ blog: parent.id });
      },
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    date: { type: GraphQLString },
    user: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.user);
      },
    },
    blog: {
      type: BlogType,
      async resolve(parent, args) {
        return await Blog.findById(parent.blog);
      },
    },
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
    // todo User Section
    // Create a User
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
          throw new AppError("User not found", 404);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new AppError("Incorrect password", 401);
        }
        return user;
      },
    },
    // todo Blog Section
    // Create a Blog
    addBlog: {
      type: BlogType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { title, content }) {
        const blog = new Blog({
          title,
          content,
        });
        return await blog.save();
      },
    },
    // Update a Blog
    updateBlog: {
      type: BlogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id, title, content }) {
        // check if blog exists
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
          throw new AppError("Blog not found", 404);
        }

        const updateBlog = await Blog.findByIdAndUpdate(
          id,
          { title, content, updatedAt: new Date() },
          { new: true }
        );
        return updateBlog;
      },
    },
    // Delete a Blog
    deleteBlog: {
      type: BlogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        // check if blog exists
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
          throw new AppError("Blog not found", 404);
        }

        const deleteBlog = await Blog.findByIdAndDelete(id);
        return deleteBlog;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
