const CommentHouse = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("comment_house", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.TEXT,
    },
    house_id: {
      type: DataTypes.TEXT,
    },
    comment: {
      type: DataTypes.TEXT,
    },

    date: {
      type: DataTypes.DATEONLY,
    },
  });

module.exports = CommentHouse;
