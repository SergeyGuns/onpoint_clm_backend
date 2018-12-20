const Sequelize = require('sequelize');

module.exports = function (sequelize) {



  const User = sequelize.define('User', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      login: Sequelize.STRING,
      password: Sequelize.SMALLINT,
      name: Sequelize.STRING,
    }
  );


  const ContentGroup = sequelize.define('ContentGroup', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
      name: Sequelize.STRING
    }
  );

  
  User.belongsToMany(ContentGroup, {as: 'Groups', through: 'usersGroups', foreignKey: 'userId' });
  ContentGroup.belongsToMany(User, {as: 'Users', through: 'usersGroups', foreignKey: 'groupId' });



  return { User, ContentGroup }
};
