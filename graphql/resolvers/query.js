const { models } = require('../../models');

module.exports = {
  user (root, { id }) {
    return models.User.findById(id);
  },
  users (root, args, context) {
    return models.User.findAll({}, context);
  },
};
