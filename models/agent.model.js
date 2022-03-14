const Agent = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("agent", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    agent_no: {
      type: DataTypes.TEXT,
    },
    avs_agent_id: {
      type: DataTypes.INTEGER,
    },
    collection_agent_id: {
      type: DataTypes.INTEGER,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    full_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    title: {
      type: DataTypes.TEXT,
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.TEXT,
    },
    lat: {
      type: DataTypes.DOUBLE,
    },
    lng: {
      type: DataTypes.DOUBLE,
    },
    suburb: {
      TYPE: DataTypes.TEXT,
    },
    nearest_bus_stop: {
      type: DataTypes.TEXT,
    },
    state: {
      type: DataTypes.INTEGER,
    },
    postcode: {
      type: DataTypes.INTEGER,
    },
    home_phone: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    bank_name: {
      type: DataTypes.STRING,
    },
    bank_branch: {
      type: DataTypes.TEXT,
    },
    account_name: {
      type: DataTypes.TEXT,
    },
    account_number: {
      type: DataTypes.STRING,
    },
    nok_name: {
      type: DataTypes.TEXT,
    },
    nok_relationship: {
      type: DataTypes.TEXT,
    },
    nok_address: {
      type: DataTypes.TEXT,
    },
    nok_suburb: {
      type: DataTypes.TEXT,
    },
    nok_state: {
      type: DataTypes.INTEGER,
    },
    nok_postcode: {
      type: DataTypes.STRING,
    },
    nok_home_phone: {
      type: DataTypes.STRING,
    },
    nok_mobile: {
      type: DataTypes.STRING,
    },
    nok_work: {
      type: DataTypes.TEXT,
    },
    employee_signature: {
      type: DataTypes.TEXT,
    },
    date_signed: {
      type: DataTypes.DATE,
    },
    passport: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    interests: {
      type: DataTypes.TEXT,
    },
    direct_sales_executive: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    activated: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    location: {
      type: DataTypes.TEXT,
    },
    is_bm: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    bm_id: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = Agent;
