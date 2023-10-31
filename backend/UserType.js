const graphql = require('graphql');
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

// Define a GraphQL object type for User
// Each UserType object will map to a document in the MongoDB database
const UserType = new GraphQLObjectType({
  name: 'User',

  // The fields of UserType represent the fields in the User model
  // Each field also has a type, which corresponds to other GraphQL object types
  fields: () => ({
    // The id of the user
    id: { type: GraphQLID },

    // The username of the user
    username: { type: GraphQLString },

    // Token field, used for authentication. It's generated when the user logs in
    token: { type: GraphQLString },

    // List of favorite restaurant IDs, saved as an array of IDs
    favoriteRestaurants: { type: new GraphQLList(GraphQLID) }
  }),
});

module.exports = UserType;
