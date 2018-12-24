const { models } = require('../../models');
const { createWriteStream } = require('fs');
const uploadDir = './uploads';
const generateHash = () => Date.now() + '_hash';

const storeUpload = async ({ stream, filename }) => {
  const hash = generateHash();
  const path = `${uploadDir}/${hash}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ hash, path }))
      .on('error', reject),
  );
};

const recordFile = (root, file, context) => {
  models.File.create(file);
};

const processUpload = async (root, upload, context) => {
  const { stream, filename, mimetype, encoding } = await upload;
  const { hash, path } = await storeUpload({ stream, filename });
  console.dir({ hash, filename, mimetype, encoding, path });

  return recordFile(
    root,
    { hash, filename, mimetype, encoding, path },
    context,
  );
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

  singleUpload: (root, { file }, context) => {
    console.log(file);
    return processUpload(root, file, context);
  },

  multipleUpload: (root, { files }) => Promise.all(files.map(processUpload)),
};
