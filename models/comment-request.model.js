const CommentRequest = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "comment_request",
    {
      comment_request_id: {
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

      request_id: {
        type: DataTypes.TEXT,
      },
    },
    { timestamp: false }
  );

module.exports = CommentRequest;
