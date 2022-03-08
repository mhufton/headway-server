// const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("../models");

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: { models }
// });

// server
//   .listen()
//   .then(({ url }) => console.log("Server is running on localhost"));

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // more middleware can go here
  // app.use('/', (req, res) => )

  server.applyMiddleware({ app, });
  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  })
}

startApolloServer(typeDefs, resolvers);