import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone';
import express from "express";
import cors from "cors";
import { typeDefs } from "./models/typeDefs.js";
import { resolvers } from "./resolvers/resolvers.js";
import { models } from "./models/cookBook.js";
import jwt from "jsonwebtoken";
import depthLimit from "graphql-depth-limit";
import { createComplexityLimitRule } from "graphql-validation-complexity";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import Dbo from "./db/conn.js";
const Db = process.env.ATLAS_URI;
const Dbs = process.env.Db_SECRET
dotenv.config();

// get the user info from a JWT

const port = process.env.PORT || 3000;
// const app = express();
// db.connect(dbo);
// app.use(cors());

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
    const token = req.headers.authorization;
    const user = getUser(token);
    return { models, user };
  },
});

// server.applyMiddleware({ app, path: "/api" });
// server.listen({ port:3000})
//       .then(({ url }) => {
//         console.log(`🚀 Server ready at ${url}`);
//       });

// mongoose.connect(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('📚 Connected to MongoDB')
//   server.listen( port, () => {

//   })
// })
// .then((res) => {
//   console.log(`Server running at ${res.url}`);
// });

// const db = await mongoose.connect(Dbo, {
// })
// .then(() => {
//   listen({ port }, () => {
//     server.connectToServer(function (err) {
//       if (err) {
//         console.error(err);
//       }
//     }),
//       console.info(`🚀 Server ready at ${port}`);
//   });
// });

// const db = await mongoose.connect(`mongodb+srv://Feulife:Jardin7FeuLife@cluster0.1vxismk.mongodb.net/cookbook?w=majority`);


const db = await mongoose.connect(`${Db}`);
console.info('Connected to db', db?.connections?._connectionString);

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 5000,
    },
});
console.info(`🚀 Server ready at ${url}`);
