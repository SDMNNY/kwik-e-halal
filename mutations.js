// We're importing the necessary tools from the 'graphql' package.
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

// Import the UserType we defined in a separate file.
const UserType = require('./UserType');

// Import the User mongoose model.
const User = require('../models/User');

// We're defining a new GraphQL ObjectType. Every GraphQL schema has a root mutation object.
const Mutation = new GraphQLObjectType({
  // The name of our Mutation
  name: 'Mutation',

  // The fields of our Mutation represent the "entry points" for data modification in our API.
  // Here we have just one, which adds a user.
  fields: {

    // The 'addUser' field can be used to create new users.
    addUser: {

      // The type of data this field will return. In this case, it's a User.
      type: UserType,

      // The arguments that this field expects. Here we expect a username and a password.
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },

      // The function that's called to perform the mutation. 
      resolve(parent, args) {
        // We create a new User instance with the provided username and password.
        let user = new User({username: args.username, password: args.password});
        
        // We save the user instance to the database and return the result.
        return user.save();
      },
    },
    // ... You'll want to add more mutations here for adding restaurants, 
    // adding a restaurant to a user's favorites, etc.
  },
});

// We're exporting the Mutation so we can use it in our main schema file.
module.exports = Mutation;
