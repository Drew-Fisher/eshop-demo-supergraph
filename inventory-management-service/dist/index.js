"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const core_1 = require("@mikro-orm/core");
const Book_1 = require("./entities/Book");
const GoogleCloudConfig_1 = require("./config/GoogleCloudConfig");
// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');
startApolloServer(`
    type Query {
      hello: String
    }
  `, {
    Query: {
        hello: () => {
            (0, GoogleCloudConfig_1.quickstart)();
            return 'world';
        },
    },
});
async function startApolloServer(typeDefs, resolvers) {
    const orm = await core_1.MikroORM.init({
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
        const book = orm.em.fork({}).create(Book_1.Book, { title: 'My First Book', id: 1 });
        console.log(book.id);
        await orm.em.fork({}).persistAndFlush(book);
        console.log('saved a new book with id', book.id);
    });
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }), (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true })],
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
