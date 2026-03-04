module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Nếu dùng db-migrate
    await queryInterface.changeColumn('users', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.changeColumn('users', 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.changeColumn('users', 'institution', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    
    await queryInterface.changeColumn('users', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    
    await queryInterface.changeColumn('users', 'institution', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
