import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Book } from './entities/Book';
import { publishMessage } from './service/message-service';
import { quickstart } from './config/GoogleCloudConfig';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

startApolloServer(
  `
    type Query {
      hello: String
    }
  `,
  {
    Query: {
      hello: () => {
        quickstart();
        return 'world';
      },
    },
  }
)

async function startApolloServer(typeDefs, resolvers) {
  
  const orm = await MikroORM.init<PostgreSqlDriver>({
    dbName: 'postgres',
    type: 'postgresql',
    entities: ['./dist//entities'],
    entitiesTs: ['./src//entities'],
    password: 'test',
    user: 'test',
  });
  console.log(orm.em);

  orm.connect().then(async () => {
    console.log('connected');
    const book = orm.em.fork({}).create(Book, { title: 'My First Book', id: 1 });
    console.log(book.id);
    await orm.em.fork({}).persistAndFlush(book);
    console.log('saved a new book with id', book.id);
  });

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

