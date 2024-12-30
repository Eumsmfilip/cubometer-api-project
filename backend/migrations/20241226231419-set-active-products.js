"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "active", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });

    await queryInterface.sequelize.query("UPDATE Products SET active = true");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "active");
  },
};
