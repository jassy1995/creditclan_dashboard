const ApprovalWorkFlow = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "approval_work_flow",
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
    },
    { timestamps: false }
  );

module.exports = ApprovalWorkFlow;