const CommentSchoolLoanModel = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "comment_school_loan",
    {
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
    },
    { timestamps: false }
  );

module.exports = CommentSchoolLoanModel;
