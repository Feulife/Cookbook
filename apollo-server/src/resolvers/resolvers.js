import Query from './query.js';
import Mutation from './mutation.js';
import recipe from './recipe.js';
import User from './user.js';
import { GraphQLDataTime } from 'graphql-iso-date';

export const resolvers = {
  Query,
  Mutation,
  recipe,
  User,
  DateTime: GraphQLDataTime
};