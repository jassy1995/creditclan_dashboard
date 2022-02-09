const CrawledProperty = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "rented_properties",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      address: {
        type: DataTypes.TEXT,
      },
      beds: {
        type: DataTypes.INTEGER,
      },
      baths: {
        type: DataTypes.INTEGER,
      },
      toilets: {
        type: DataTypes.INTEGER,
      },
      agent_name: {
        type: DataTypes.TEXT,
      },
      agent_phone: {
        type: DataTypes.TEXT,
      },
      agent_email: {
        type: DataTypes.TEXT,
      },
      duration: {
        type: DataTypes.TEXT,
      },
      is_approved: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );

module.exports = CrawledProperty;
