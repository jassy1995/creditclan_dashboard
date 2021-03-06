const CommentRestaurant = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("comment_restaurant", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.TEXT,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
    },
    comment: {
      type: DataTypes.TEXT,
    },

    date: {
      type: DataTypes.DATEONLY,
    },
  });

module.exports = CommentRestaurant;
