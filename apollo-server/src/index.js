import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {typeDefs} from './models/typeDefs.js';
import {resolvers} from './resolvers.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const Db = process.env.ATLAS_URI;

const db = mongoose.connect(Db);

console.info('📚 Connected to db', db?.connections?._connectionString);

const server = new ApolloServer({typeDefs, resolvers});

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000,
    },
});

console.info(`🚀 Server ready at ${url}`);