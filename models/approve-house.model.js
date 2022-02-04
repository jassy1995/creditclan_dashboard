const ApproveHouse = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "approve_house",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      manager_id: {
        type: DataTypes.TEXT,
      },
      bm_id: {
        type: DataTypes.TEXT,
      },
      house_id: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      is_approved: {
        type: DataTypes.STRING,
      },
      comments: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );

module.exports = ApproveHouse;
