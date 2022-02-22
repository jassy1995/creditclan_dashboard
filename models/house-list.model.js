const ListHouse = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "listing_house",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      date_added: {
        type: DataTypes.DATEONLY,
      },
      date_modified: {
        type: DataTypes.TEXT,
      },
      landlord_id: {
        type: DataTypes.TEXT,
      },

      agent_id: {
        type: DataTypes.TEXT,
      },
      caretaker_id: {
        type: DataTypes.TEXT,
      },
      address: {
        type: DataTypes.TEXT,
      },
      city: {
        type: DataTypes.TEXT,
      },
      state: {
        type: DataTypes.TEXT,
      },
      lga: {
        type: DataTypes.TEXT,
      },
      landmark: {
        type: DataTypes.TEXT,
      },
      house_type: {
        type: DataTypes.TEXT,
      },
      lat: {
        type: DataTypes.TEXT,
      },
      lng: {
        type: DataTypes.TEXT,
      },
      rent_amount: {
        type: DataTypes.TEXT,
      },
      house_category: {
        type: DataTypes.TEXT,
      },
      house_description: {
        type: DataTypes.TEXT,
      },
      rooms: {
        type: DataTypes.TEXT,
      },
      bathrooms: {
        type: DataTypes.TEXT,
      },
      toilet: {
        type: DataTypes.TEXT,
      },
      gated_security: {
        type: DataTypes.TEXT,
      },
      water: {
        type: DataTypes.TEXT,
      },
      power: {
        type: DataTypes.TEXT,
      },
      listing_status: {
        type: DataTypes.INTEGER,
      },
      listing_title: {
        type: DataTypes.TEXT,
      },
      security_deposit_percentage: {
        type: DataTypes.TEXT,
      },
      pictures: {
        type: DataTypes.TEXT,
      },
      rent_start_date: {
        type: DataTypes.TEXT,
      },
      rent_end_date: {
        type: DataTypes.TEXT,
      },
      tenant_id: {
        type: DataTypes.TEXT,
      },
      user_id: {
        type: DataTypes.TEXT,
      },
      owned_by: {
        type: DataTypes.INTEGER,
      },
      property_code: {
        type: DataTypes.TEXT,
      },
      videolink: {
        type: DataTypes.TEXT,
      },
      picture: {
        type: DataTypes.TEXT,
      },
      phone: {
        type: DataTypes.TEXT,
      },
      is_approved: {
        type: DataTypes.STRING,
      },
      date_added: {
        type: DataTypes.DATE,
      },
    },
    { timestamps: false }
  );

module.exports = ListHouse;
