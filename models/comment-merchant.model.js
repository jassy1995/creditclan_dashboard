const CommentMerchant = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("comment_Merchant", {
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
      type: DataTypes.INTEGER,
    },
    comment: {
      type: DataTypes.TEXT,
    },

    date: {
      type: DataTypes.DATEONLY,
    },
  });

module.exports = CommentMerchant;
