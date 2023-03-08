import gql from 'graphql-tag';

export const typeDefs = gql`
    scalar DateTime

    type Recipe {
      id: ID!
      content: String!
      author: User!
      favoriteCount: Int!
      favoritedBy: [User]
      createdAt: DateTime!
      updateedAt: DateTime!
    }

    type User {
      id: ID!
      username: String!
      email: String!
      avatar: String
      recipes: [Recipe!]!
      favorites: [Recipe!]!
    }

    type RecipeFeed {
      recipes: [Recipe]!
      cursor: String!
      hasNextPage: Boolean!
    }

    type Query {
      recipes: [Recipe!]!
      recipe(id: ID): Recipe!
      user(username: String!): User
      users: [User!]!
      me: User!
      recipeFeed(cursor: String): RecipeFeed
    }

    type Mutation {
      newRecipe(content: String): Recipe
      updateRecipe(id: ID!, content: String!): Recipe!
      deleteRecipe(id: ID!): Recipe!
      toggleFavorite(id:ID!): Recipe!
      singUp(username: String!, email: String!, password: String!): String!
      singIn(username: String, email: String, password: String!): String!
    }

    # type Query {
    #     hello(name: String): String
    #     books: [Book]
    # }
    # type Book {
    #     id: ID,
    #     title: String,
    #     year: Int,
    # }
    # type Mutation {
    #     create(title: String, year: Int): Book
    #     delete(id: ID): ID
    #     edit(id: ID, title: String, year: Int): Book
    # }
`;