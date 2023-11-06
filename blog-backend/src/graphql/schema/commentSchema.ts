const { makeExecutableSchema } = require("graphql-tools");
// Custom Imports
const Comment = require("../../models/commentModel");

const typeDefs = `
type CommentType {
    id: ID!
    text: String!
}

type Query {
    comments: [CommentType]
}
`;

const resolvers = {
  Query: {
    comments: async () => {
      return await Comment.find();
    },
  },
};

const CommentSchema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = CommentSchema;
