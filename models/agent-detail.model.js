const AgentDetail = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "agent_detail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      address: {
        type: DataTypes.TEXT,
      },
      phone_number: {
        type: DataTypes.TEXT,
      },
      whatsapp_number: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );

module.exports = AgentDetail;
