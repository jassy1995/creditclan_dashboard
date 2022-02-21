const CrawlingRecord = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("crawling_record", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
  });

module.exports = CrawlingRecord;
