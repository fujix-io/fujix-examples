const { ApolloServer } = require('apollo-server');

const { createContext } = require('./context');
const { schema } = require('./schema');

const server = new ApolloServer({
  schema,
  context: createContext,
});

server.listen()
.then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
