// We're importing the necessary tools from the 'graphql' package.
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import the UserType we defined in a separate file.
const UserType = require('./UserType');

// Import the User mongoose model.
const User = require('./User');

// We're defining a new GraphQL ObjectType. Every GraphQL schema has a root mutation object.
const Mutation = new GraphQLObjectType({
  // The name of our Mutation
  name: 'Mutation',

  // The fields of our Mutation represent the "entry points" for data modification in our API.
  // Here we have two mutations: one for adding a user, and another one for logging in a user.
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
      async resolve(parent, args) {
        // We create a new User instance with the provided username and password.
        let user = new User({username: args.username, password: args.password});
        
        // We save the user instance to the database and return the result.
        return user.save();
      },
    },

    // Define a mutation to log in a user
    loginUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // Get the username and password from the arguments
        const { username, password } = args;

        // Find a user with the provided username
        const user = await User.findOne({ username });

        // If the user doesn't exist, throw an error
        if (!user) {
          throw new Error('Invalid username or password');
        }

        // Check if the provided password is correct
        const isValid = await user.isValidPassword(password);

        // If the password isn't valid, throw an error
        if (!isValid) {
          throw new Error('Invalid username or password');
        }

        // If the username and password are valid, sign a new token
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Return the user and the token
        return { user, token };
      },
    },

    // ... You'll want to add more mutations here for adding restaurants, 
    // adding a restaurant to a user's favorites, etc.
  },
});

// We're exporting the Mutation so we can use it in our main schema file.
module.exports = Mutation;
