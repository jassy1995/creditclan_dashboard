const CrawlingRecord = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("crawling_record", {
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
    },
  });

module.exports = ApprovalWorkFlow;
