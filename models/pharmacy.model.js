const Pharmacy = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("pharmacies", {
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
    total_meals_today: {
      type: DataTypes.INTEGER,
    },
    waiters: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    pharmacy_name: {
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
    agreement_signed: {
      type: DataTypes.INTEGER,
    },
    is_declined: {
      type: DataTypes.INTEGER,
    },
    has_discount: {
      type: DataTypes.INTEGER,
    },
    code: {
      type: DataTypes.TEXT,
    },
    agent_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });

module.exports = Pharmacy;

