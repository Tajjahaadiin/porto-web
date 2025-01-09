"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Projects", "dateStart", {
      type: Sequelize.DATE,
      timezone: "GMT+7", // Replace with your desired timezone (e.g., 'UTC', 'America/Los_Angeles')
    });
  },
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Projects", "dateEnd", {
      type: Sequelize.DATE,
      timezone: "GMT+7", // Replace with your desired timezone (e.g., 'UTC', 'America/Los_Angeles')
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
