const { models } = require('../../models');

module.exports = {
  contentGroups (user) {
    return user.getGroups();
  }
};
