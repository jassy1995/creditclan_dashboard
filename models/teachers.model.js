const Teacher = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("teacher", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    school_id: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    salary: {
      type: DataTypes.TEXT,
    },
    loan_request_link: {
      type: DataTypes.TEXT,
    },
    bank: {
      type: DataTypes.TEXT,
    },
    bank_number: {
      type: DataTypes.TEXT,
    },
    account_name: {
      type: DataTypes.TEXT,
    },
    loan_eligibility: {
      type: DataTypes.TEXT,
    },
    deleted: {
      type: DataTypes.TEXT,
    },
    bvn: {
      type: DataTypes.TEXT,
    },
    picture: {
      type: DataTypes.TEXT,
    },
    salary_payment: {
      type: DataTypes.STRING,
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    is_approved: {
      type: DataTypes.INTEGER,
    },
    step: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.STRING,
    },
    updated_at: {
      type: DataTypes.STRING,
    },
  });

module.exports = Teacher;
