const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for User
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  favoriteRestaurants: [String]
});

// Add a 'pre' function that hashes the password before saving the user
// This function will automatically run before a document is saved
UserSchema.pre('save', async function(next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  // Go to the next middleware (or save the user if this is the last middleware)
  next();
});

// Add a method to the User model to validate the password
// This method will be used to check the provided password against the hashed one in the database
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
}

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// Export the model so it can be used in other parts of the application
module.exports = User;
