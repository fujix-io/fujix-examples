const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    post(id: ID!): Post!
    posts(searchString: String, isPublished: Boolean): [Post!]!
  }

  type Mutation {
    signUp(email: String!, name: String!, role: Role = ADMIN, posts: [PostCreateInput!]): User!
    createPost(title: String!, content: String, authorId: ID!): Post!
    publishPost(id: ID!): Post!
    deletePost(id: ID!): Post!
  }

  type User {
    id: ID!
    email: String!
    name: String
    role: Role!
    posts: [Post!]!
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    published: Boolean!
    title: String!
    content: String
    author: User
    createdAt: String!
    updatedAt: String!
  }

  enum Role {
    AUTHOR
    ADMIN
  }

  input PostCreateInput {
    title: String!
    content: String
  }
`;

module.exports = {
  typeDefs,
};
