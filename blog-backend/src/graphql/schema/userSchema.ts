const { makeExecutableSchema } = require("graphql-tools");
// Custom Imports
const User = require("../../models/userModel");

const typeDefs = `
  type UserType {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [UserType]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
  },
};

const UserSchema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = UserSchema;
