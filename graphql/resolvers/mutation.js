const { models } = require('../../models');
const generateId = require('shortid').generate;

const storeUpload = async ({ stream, filename }) => {
  const uploadDir = './uploads';
  const id = generateId();
  const path = `${uploadDir}/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject),
  );
};

const recordFile = file =>
  db
    .get('uploads')
    .push(file)
    .last()
    .write();

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload;
  const { id, path } = await storeUpload({ stream, filename });
  return recordFile({ id, filename, mimetype, encoding, path });
};

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
  singleUpload: (obj, { file }) => processUpload(file),
  multipleUpload: (obj, { files }) => Promise.all(files.map(processUpload)),
};
