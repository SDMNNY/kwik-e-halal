const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

mongoose.connect('mongodb://localhost/kwik-e-halal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(5000, () => console.log('Server Running'));
})
.catch(err => {
  console.log(err);
});
