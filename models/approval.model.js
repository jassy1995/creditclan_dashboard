const Restaurant = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("approval", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    approval_id: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.TEXT,
    },
    restaurant_id: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    is_approved: {
      type: DataTypes.TEXT,
    },
    comments: {
      type: DataTypes.JSON,
    },

  });

module.exports = Restaurant;
