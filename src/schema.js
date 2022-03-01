const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
  }

  type Link {
    id: Int!
    url: String!
    slug: String!
  }

  type Query {
    user(id: Int!): User
    links: [Link]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createLink(url: String!, slug: String): Link!
  }
`;

module.exports = typeDefs;
