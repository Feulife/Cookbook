import { ApolloServer } from "@apollo/server";
// import {startStandaloneServer} from '@apollo/server/standalone';
import express from "express";
import cors from "cors";
import { typeDefs } from "./models/typeDefs.js";
import { resolvers } from "./resolvers/resolvers.js";
import jwt from "jsonwebtoken";
import depthLimit from "graphql-depth-limit";
import { createComplexityLimitRule } from "graphql-validation-complexity";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dbo from "./db/conn.js";
// const Db = process.env.ATLAS_URI;
dotenv.config();
// const Db = process.env.ATLAS_URI;
// const db = await mongoose.connect('mongodb+srv://Feulife:Jardin7FeuLife@cluster0.1vxismk.mongodb.net/exemplify_MERN?retryWrites=true&w=majority');
// console.info('📚 Connected to db', db?.connections?._connectionString);

// get the user info from a JWT

const port = process.env.PORT || 3000;
const app = express();
// db.connect(dbo);
app.use(cors());

const getUser = (token) => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Session invalid");
    }
  }
};
// Apollo server setup
// updated to include 'validationRules'
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    // try to retrieve a user with the token
    const user = getUser(token);
    // add the db models and the user to the context
    return { models, user };
  },
});

// server.applyMiddleware({ app, path: "/api" });

// mongoose.connect();

app.listen({ port }, () => {
  dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
    }
  }),
    console.info(`🚀 Server ready at ${port}`);
});
// const { url } = await startStandaloneServer(server, {
//     listen: {
//         port: 4000,
//     },
// });

// console.info(`🚀 Server ready at ${url}`);
