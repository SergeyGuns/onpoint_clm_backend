const { models } = require('../../models');

module.exports = {
  users(contentGroup) {
    return contentGroup.getUsers();
  },
};
