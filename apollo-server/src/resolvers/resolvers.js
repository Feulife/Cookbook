import Query from './query.js';
import Mutation from './mutation.js';
import Recipe from './recipe.js';
import User from './user.js';
import { DateTimeScalar } from 'graphql-date-scalars'
// import DateTime from './dataTime.js'
// import pkg from 'graphql-iso-date';

// const { GraphQLDateTime } = pkg;
// const DateTime  = new Date().toLocaleDateString();


export const resolvers = {
  Query,
  Mutation,
  Recipe,
  User,
  DateTime: DateTimeScalar
};