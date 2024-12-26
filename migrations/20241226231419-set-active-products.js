'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cubometer_api', 'active', {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });

    await queryInterface.sequelize.query('UPDATE cubometer_api SET active = true');

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cubometer_api', 'active');
  }
};
