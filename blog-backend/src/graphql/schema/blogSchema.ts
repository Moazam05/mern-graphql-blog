const { makeExecutableSchema } = require("graphql-tools");
// Custom Imports
const Blog = require("../../models/blogModel");

const typeDefs = `
type BlogType {
    id: ID!
    title: String!
    content: String!    
}

type Query {
    blogs: [BlogType]
}
`;

const resolvers = {
  Query: {
    blogs: async () => {
      return await Blog.find();
    },
  },
};

const BlogSchema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = BlogSchema;
