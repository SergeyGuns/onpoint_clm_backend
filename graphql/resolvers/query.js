const { models } = require('../../models');

module.exports = {
  user(root, { id }) {
    return models.User.findById(id);
  },
  users(root, args, context) {
    return models.User.findAll({}, context);
  },
  contentGroup(root, { id }) {
    return models.ContentGroup.findById(id);
  },
  contentGroups(root, args, context) {
    return models.ContentGroup.findAll({}, context);
  },
  getAllPresentations(root, args, context) {
    return models.Presentation.findAll({}, context);
  },
};
