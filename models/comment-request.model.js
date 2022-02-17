const CommentRequest = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("comment_request", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.TEXT,
    },
    request_id: {
      type: DataTypes.TEXT,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
  });

module.exports = CommentRequest;
