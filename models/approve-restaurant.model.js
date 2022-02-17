const ApproveRestaurant = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("approve_restaurant", {
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
    restaurant_id: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    is_approved: {
      type: DataTypes.STRING,
    },
  });

module.exports = ApproveRestaurant;
