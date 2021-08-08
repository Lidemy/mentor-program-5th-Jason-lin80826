module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('prize_prizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prizeName: {
        type: Sequelize.STRING
      },
      Url: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      probability: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('prize_prizes')
  }
}
