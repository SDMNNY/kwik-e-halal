// We're importing the GraphQLSchema constructor from the 'graphql' package.
const { GraphQLSchema } = require('graphql');

// Import the RootQuery we defined in a separate file.
const RootQuery = require('./RootQuery');

// Import the Mutation we defined in a separate file.
const Mutation = require('./mutations');

// We're creating a new GraphQL schema. 
// A GraphQL schema is created using the GraphQLSchema constructor. It takes an object as an argument.
// This object can have two fields:
//   - query: This should be a GraphQLObjectType that we'll use as the root query.
//   - mutation: This should be a GraphQLObjectType that we'll use as the root mutation.
module.exports = new GraphQLSchema({
  // The root query object allows us to fetch data.
  query: RootQuery,

  // The root mutation object allows us to modify data (create, update, delete).
  mutation: Mutation,
});
