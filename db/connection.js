var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://akvqxdmipxutfp:UXzEs0uKkoPZAhSPaa4p_WmT3S@ec2-184-73-253-4.compute-1.amazonaws.com:5432/d4gpabuehh8q2a', {
  dialect: 'postgres',
  protocol: 'postgres'
});

module.exports = {
  DataTypes: Sequelize,
  sequelize: sequelize
};
