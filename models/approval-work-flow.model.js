const ApprovalWorkFlow = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("approval_work_flow_restaurant", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.TEXT,
    },
    action: {
      type: DataTypes.TEXT,
    },
    request_id: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    pre_step: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

module.exports = ApprovalWorkFlow;
