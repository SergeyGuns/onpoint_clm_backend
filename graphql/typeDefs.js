module.exports = `

  scalar Date
  scalar Upload

  type User {
    id: ID!
    login: String!
    password: String!
    name: String!
    contentGroups: [ContentGroup]
  }

  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }


  type Presentation {
    id: ID!
    name: String!
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
    presentations: [Presentation]
    uploads: [File]
  }

  type Mutation {
    createUser(name: String!, login: String!, password: String!): User
    updateUser(id: ID!, name: String, login: String, password: String): User
    removeUser(id: ID!): User
    createContentGroup(name: String!, usersId: [ID]): ContentGroup
    updateContentGroup(id: ID!, name: String!, usersId: [ID]): ContentGroup
    removeContentGroup(id: ID!): ContentGroup
    addUsersInContentGroup(usersId: [ID!], contentGroupId: ID!): ContentGroup
    createPresentation(name: String!): Presentation
    singleUpload (file: Upload!): File!
    multipleUpload (files: [Upload!]!): [File!]!
  }

  schema {
    query: Query
    mutation: Mutation
  }

  `;
