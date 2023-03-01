import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {typeDefs} from './models/typeDefs.js';
import {resolvers} from './resolvers/resolvers.js';
import jwt from 'jsonwebtoken';
import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const Db = process.env.ATLAS_URI;

const db = mongoose.connect(Db);

console.info('📚 Connected to db', db?.connections?._connectionString);

// get the user info from a JWT

// Apollo server setup
// updated to include 'validationRules'

const server = new ApolloServer({
  typeDefs,
  resolvers,

});

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000,
    },
});

console.info(`🚀 Server ready at ${url}`);