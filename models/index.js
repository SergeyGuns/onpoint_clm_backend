const Sequelize = require('sequelize');
const models = require('./models');

//const Op = Sequelize.Op;

const sequelize = new Sequelize('demo_name', 'root', 'passwor', {
  dialect: 'sqlite',
  storage: 'db.sqlite3',
  //operatorsAliases: { $and: Op.and },
  operatorsAliases: false,
  logging: false
});

models(sequelize);
sequelize.sync();

module.exports.sequelize = sequelize;
module.exports.models = sequelize.models;
