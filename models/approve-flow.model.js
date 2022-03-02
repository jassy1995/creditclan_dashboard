const ApproveFlow = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "approve_flow",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      action: {
        type: DataTypes.STRING,
      },
      owner: {
        type: DataTypes.STRING,
      },
      priority: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );

module.exports = ApproveFlow;
