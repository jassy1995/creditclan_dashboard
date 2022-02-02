const Comment = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("comment", {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.TEXT,
    },
    date_added: {
      type: DataTypes.DATEONLY,
    },

    restaurant_id: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = Comment;
