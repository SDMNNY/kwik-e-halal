// We're importing the necessary tools from the 'graphql' package.
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;

// Import the UserType we defined in a separate file.
const UserType = require('./UserType');

// Import the User mongoose model.
const User = require('./User');

// We're defining a new GraphQL ObjectType. Every GraphQL schema has a root query object.
const RootQuery = new GraphQLObjectType({
  // The name of our RootQuery
  name: 'RootQueryType',

  // The fields of our RootQuery represent the "entry points" into our API. 
  // In this case, we have just one, which fetches a user by ID.
  fields: {

    // The 'user' field can be used to fetch user data.
    user: {
      // The type of data this field will return. In this case, it's a User.
      type: UserType,

      // The arguments that this field expects. In this case, a user ID.
      args: { id: { type: GraphQLID } },

      // The function that's called to fetch data. It's called with two arguments:
      //  - parent: The data returned by the parent field, which in this case is undefined because 'user' is a root field.
      //  - args: An object that holds all arguments passed into the field. In this case, it should hold an 'id'.
      resolve(parent, args) {
        // We're using the args.id to fetch and return a user from the database.
        // This will use the Mongoose model's 'findById' function.
        return User.findById(args.id);
      },
    },
  },
});

// We're exporting the RootQuery so we can use it in our main schema file.
module.exports = RootQuery;
