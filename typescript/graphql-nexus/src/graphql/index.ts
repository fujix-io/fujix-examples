import { ApolloServer } from 'apollo-server';

import schema from './schema';
import context from './context';

const server = new ApolloServer({
  schema,
  context,
  playground: true,
  introspection: true,
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`🚀  The server's running at ${url}`);
  });
