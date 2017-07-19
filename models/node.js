const Moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var node = sequelize.define('place', {
    name:DataTypes.STRING,
    description:DataTypes.STRING,
    latitude:DataTypes.STRING,
    longitude:DataTypes.STRING,
    centralLatitude:DataTypes.STRING,
    centralLongitude:DataTypes.STRING,
  });

  return node;
};