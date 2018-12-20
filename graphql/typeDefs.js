module.exports = (`

  scalar Date

  type User {
    id: ID!
    login: String!
    password: Int!
    name: String!
  }

  input user_input {
    login: String!
    password: Int!
    name: String!
}

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(input: user_input!): User
    updateUser(id: ID!, input: user_input!): User
    removeUser(id: ID!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }

  `)
