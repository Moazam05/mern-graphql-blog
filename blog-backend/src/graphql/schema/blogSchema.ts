const { makeExecutableSchema } = require("graphql-tools");
// Custom Imports
const Blog = require("../../models/blogModel");
const AppError = require("../../utils/appError");

const typeDefs = `
type BlogType {
    id: ID!
    title: String!
    content: String!
    date: String!
    updatedAt: String  
}

type Query {
    blogs: [BlogType]
}

type Mutation {
  addBlog(title: String!, content: String!): BlogType
  updateBlog(id: ID!, title: String!, content: String!): BlogType
}
`;

const resolvers = {
  // get all blogs
  Query: {
    blogs: async () => {
      return await Blog.find();
    },
  },
  // Create new blog
  Mutation: {
    addBlog: async (_, { title, content }) => {
      try {
        const blog = await Blog.create({ title, content });
        return blog;
      } catch (error) {
        throw new AppError(error.message, 500);
      }
    },
    // update blog
    updateBlog: async (_, { id, title, content }) => {
      try {
        // check if blog exists
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) return new AppError("Blog does not exist");

        const updateBlog = await Blog.findByIdAndUpdate(
          id,
          { title, content, updatedAt: new Date() },
          { new: true }
        );
        return updateBlog;
      } catch (error) {
        throw new AppError(error.message, 500);
      }
    },
  },
};

const BlogSchema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = BlogSchema;
