const ApproveCrawledProperty = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "approve_crawled_properties",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      se_id: {
        type: DataTypes.TEXT,
      },
      bm_id: {
        type: DataTypes.TEXT,
      },
      manager_id: {
        type: DataTypes.TEXT,
      },
      property_id: {
        type: DataTypes.TEXT,
      },
      property_amount: {
        type: DataTypes.TEXT,
      },
      monthly_payment: {
        type: DataTypes.TEXT,
      },
      duration: {
        type: DataTypes.TEXT,
      },
      upfront: {
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

module.exports = ApproveCrawledProperty;
