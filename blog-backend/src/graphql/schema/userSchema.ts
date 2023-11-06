const { makeExecutableSchema } = require("graphql-tools");
const bcrypt = require("bcryptjs");
// Custom Imports
const AppError = require("../../utils/appError");
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

  type Mutation {
    signup(name: String!, email: String!, password:String!): UserType
    login(email: String!, password: String!): UserType
  }
`;

const resolvers = {
  // get all users
  Query: {
    users: async () => {
      return await User.find();
    },
  },
  // Create new user
  Mutation: {
    signup: async (_, { name, email, password }) => {
      try {
        const encryptedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
          name,
          email,
          password: encryptedPassword,
        });
        return user;
      } catch (error) {
        throw new AppError(error.message, 500);
      }
    },
    // Login user
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError("Invalid email or password", 401);
      }

      return user;
    },
  },
};

const UserSchema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = UserSchema;
