const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const User = sequelize.define('User', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
  });

  const File = sequelize.define('File', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    hash: Sequelize.STRING,
    path: Sequelize.STRING,
    filename: Sequelize.STRING,
    mimetype: Sequelize.STRING,
    encoding: Sequelize.STRING,
  });

  const ContentGroup = sequelize.define('ContentGroup', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
  });

  const Presentation = sequelize.define('Presentation', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
  });

  User.belongsToMany(ContentGroup, {
    as: 'Groups',
    through: 'usersGroups',
    foreignKey: 'userId',
  });

  ContentGroup.belongsToMany(User, {
    as: 'Users',
    through: 'usersGroups',
    foreignKey: 'groupId',
  });

  return { User, ContentGroup, Presentation, File };
};
