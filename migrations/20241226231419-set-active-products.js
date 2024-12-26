'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });

    // Optional: Set the default value for existing records
    await queryInterface.sequelize.query('UPDATE Products SET active = true');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'active');
  },
};
