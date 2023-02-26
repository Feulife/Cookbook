import gql from 'graphql-tag';

export const typeDefs = gql`
    scalar DateTime

    type Note {
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
      notes: [Note!]!
      favorites: [Note!]!
    }

    type NoteFeed {
      notes: [Note]!
      cursor: String!
      hasNextPage: Boolean!
    }

    type Query {
      notes: [Note!]!
      note(id: ID): Note!
      user(username: String!): User
      users: [User!]!
      me: User!
      noteFeed(cursor: String): NoteFeed
    }

    type Mutation {
      newNote(content: String): Note
      updateNote(id: ID!, content: String!): Note!
      deleteNote(id: ID!): Note!
      singUp(username: String!, email: String!, password: String!): String!
      singIN(username: String, email: String, password: String!): String!
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