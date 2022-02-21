const Restaurant = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "restaurant",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      location: {
        type: DataTypes.TEXT,
      },
      lat: {
        type: DataTypes.TEXT,
      },
      lng: {
        type: DataTypes.TEXT,
      },
      account_number: {
        type: DataTypes.TEXT,
      },
      bank_code: {
        type: DataTypes.TEXT,
      },
      meal_amounts: {
        type: DataTypes.TEXT,
      },
      waiters: {
        type: DataTypes.TEXT,
      },
      phone: {
        type: DataTypes.TEXT,
      },
      restaurant_name: {
        type: DataTypes.TEXT,
      },
      payload: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.TEXT,
      },
      is_approved: {
        type: DataTypes.INTEGER,
      },
      step: {
        type: DataTypes.INTEGER,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    }
    // { timestamps: false }
  );

module.exports = Restaurant;

//  `id` int(11) NOT NULL,
//   `location` text,
//   `lat` text,
//   `lng` text,
//   `account_number` text,
//   `bank_code` text,
//   `meal_amounts` text,
//   `waiters` text,
//   `created_at` datetime DEFAULT NULL,
//   `updated_at` datetime DEFAULT NULL,
//   `phone` text,
//   `restaurant_name` text,
//   `payload` text,
//   `image` text
