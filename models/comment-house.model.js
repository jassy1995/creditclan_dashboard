const CommentHouse = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "comment_houses",
    {
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

      house_id: {
        type: DataTypes.TEXT,
      },
    },
    { timestamp: false }
  );

module.exports = CommentHouse;
