module.exports = `

  scalar Date

  type User {
    id: ID!
    login: String!
    password: String!
    name: String!
    contentGroups: [ContentGroup]
  }

  type ContentGroup {
    id: ID!
    name: String!
    users: [User]
  }

  type Query {
    user(id: ID!): User
    users: [User]
    contentGroup(id: ID!): ContentGroup
    contentGroups: [ContentGroup]
  }

  type Mutation {
    createUser(name: String!, login: String!, password: String!): User
    updateUser(id: ID!, name: String, login: String, password: String): User
    removeUser(id: ID!): User
    createContentGroup(name: String!, usersId: [ID]): ContentGroup
    updateContentGroup(id: ID!, name: String!, usersId: [ID]): ContentGroup
    removeContentGroup(id: ID!): ContentGroup
    addUsersInContentGroup(usersId: [ID!], contentGroupId: ID!): ContentGroup
  }

  schema {
    query: Query
    mutation: Mutation
  }

  `;
