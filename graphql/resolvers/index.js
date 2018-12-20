const GraphQLDate = require('graphql-date');

const query = require('./query');
const mutation = require('./mutation');
const user = require('./user');
const content_group = require('./content_group');

module.exports = function resolvers () {
  return {
    Query: query,
    Mutation: mutation,
    User: user,
    ContentGroup: content_group,
    Date: GraphQLDate
  };
};
