const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const User = sequelize.define('User', {
    login: Sequelize.STRING,
    password: Sequelize.SMALLINT,
    name: Sequelize.STRING
  });

  return {
    User
  };
};
