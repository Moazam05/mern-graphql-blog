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
}

type Query {
    blogs: [BlogType]
}

type Mutation {
  addBlog(title: String!, content: String!): BlogType
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
  },
};

const BlogSchema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = BlogSchema;
