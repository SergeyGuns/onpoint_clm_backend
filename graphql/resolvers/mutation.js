const { models } = require('../../models');

module.exports = {
  createUser(root, input, context) {
    return models.User.create(input);
  },

  updateUser(root, { id, input }, context) {
    return models.User.findById(id).then(user => {
      return user.update(input);
    });
  },

  removeUser(root, { id }, context) {
    return models.User.findById(id).then(user => user.destroy());
  },

  createContentGroup(root, { name }, context) {
    return models.ContentGroup.create({ name });
  },

  updateContentGroup(root, { id, name }, context) {
    return models.ContentGroup.findById(id).then(group => {
      return group.update({ name });
    });
  },

  removeContentGroup(root, { id }, context) {
    return models.ContentGroup.findById(id).then(group => group.destroy());
  },

  addUsersInContentGroup(root, { usersId, contentGroupId }, context) {
    return models.ContentGroup.findById(contentGroupId).then(group => {
      return models.User.findAll({ where: { id: usersId } }).then(users => {
        group.addUsers(users);
        return group;
      });
    });
  },

  createPresentation(root, input, context) {
    return models.Presentation.create(input);
  },
};
