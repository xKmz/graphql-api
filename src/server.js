const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const mongoose = require('mongoose');

const UserResolver = require('./resolvers/UserResolver');
const AppointmentResolver = require('./resolvers/AppointmentResolver');

mongoose.connect('mongodb://localhost:27017/desafio-backend', {
  useNewUrlParser: true,
});

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schema.graphql'),
  resolvers: [UserResolver, AppointmentResolver],
});

server.start(() => {
  console.log('server started!');
});
