const ApproveFlow = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("approve_flow", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    action: {
      type: DataTypes.STRING,
    },
    owner: {
      type: DataTypes.STRING,
    },
    fulfillment: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
  });

module.exports = ApproveFlow;
