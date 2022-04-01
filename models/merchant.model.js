const Merchant = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("merchant", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    agent_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    registered_with: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    email_validated: {
      type: DataTypes.INTEGER,
    },
    email_token: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    phone_validated: {
      type: DataTypes.INTEGER,
    },
    phone_token: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.TEXT,
    },
    whatsapp_no: {
      type: DataTypes.TEXT,
    },
    whatsapp_validated: {
      type: DataTypes.INTEGER,
    },
    whatsapp_link: {
      type: DataTypes.TEXT,
    },

    facebook: {
      type: DataTypes.TEXT,
    },

    instagram: {
      type: DataTypes.TEXT,
    },

    twitter: {
      type: DataTypes.TEXT,
    },

    jumia: {
      type: DataTypes.TEXT,
    },

    jiji: {
      type: DataTypes.TEXT,
    },

    konga: {
      type: DataTypes.TEXT,
    },
    whatsapp_code: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.TEXT,
    },
    state_id: {
      type: DataTypes.INTEGER,
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
    business_type: {
      type: DataTypes.INTEGER,
    },
    bank_code: {
      type: DataTypes.INTEGER,
    },
    bank_id: {
      type: DataTypes.INTEGER,
    },
    account_name: {
      type: DataTypes.TEXT,
    },
    account_number: {
      type: DataTypes.TEXT,
    },
    verified: {
      type: DataTypes.INTEGER,
    },
    is_active: {
      type: DataTypes.INTEGER,
    },
    interests: {
      type: DataTypes.TEXT,
    },
    uses_global: {
      type: DataTypes.INTEGER,
    },
    popular_products_activated: {
      type: DataTypes.INTEGER,
    },
    global_catalogue_link: {
      type: DataTypes.TEXT,
    },
    added_global_items: {
      type: DataTypes.TEXT,
    },
    partnership_email_token: {
      type: DataTypes.TEXT,
    },
    partnership: {
      type: DataTypes.INTEGER,
    },
    upfront_rate: {
      type: DataTypes.FLOAT,
    },
    monthly_interest_rate: {
      type: DataTypes.FLOAT,
    },
    max_credit_duration: {
      type: DataTypes.INTEGER,
    },
    interest_on_total: {
      type: DataTypes.INTEGER,
    },
    interest_on_balance: {
      type: DataTypes.INTEGER,
    },
    orders_notify: {
      type: DataTypes.INTEGER,
    },
    repayments_notify: {
      type: DataTypes.INTEGER,
    },
    banner_image: {
      type: DataTypes.TEXT,
    },
    banner_title: {
      type: DataTypes.TEXT,
    },
    banner_subtitle: {
      type: DataTypes.TEXT,
    },
    sections: {
      type: DataTypes.TEXT,
    },

    items_display: {
      type: DataTypes.INTEGER,
    },
    items_display: {
      type: DataTypes.TEXT,
    },
    template: {
      type: DataTypes.INTEGER,
    },
    filter_position: {
      type: DataTypes.TEXT,
    },

    details_template: {
      type: DataTypes.INTEGER,
    },
    collection_banner: {
      type: DataTypes.INTEGER,
    },
    publisher: {
      type: DataTypes.INTEGER,
    },
    show_product_comments: {
      type: DataTypes.INTEGER,
    },
    show_product_ratings: {
      type: DataTypes.INTEGER,
    },
    online: {
      type: DataTypes.INTEGER,
    },
    other_platforms: {
      type: DataTypes.TEXT,
    },
    store_photo: {
      type: DataTypes.TEXT,
    },
    internal: {
      type: DataTypes.INTEGER,
    },
    email_change_otp: {
      type: DataTypes.TEXT,
    },
    phone_change_otp: {
      type: DataTypes.TEXT,
    },

    eligibility: {
      type: DataTypes.INTEGER,
    },
    collection: {
      type: DataTypes.INTEGER,
    },
    insurance: {
      type: DataTypes.INTEGER,
    },
    widget: {
      type: DataTypes.INTEGER,
    },
    whatsapp_stage: {
      type: DataTypes.INTEGER,
    },

    bot_name: {
      type: DataTypes.TEXT,
    },
    top_category_one: {
      type: DataTypes.TEXT,
    },
    top_category_two: {
      type: DataTypes.TEXT,
    },
    top_category_three: {
      type: DataTypes.TEXT,
    },

    sender_id: {
      type: DataTypes.INTEGER,
    },
    temporary_bot: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    industry: {
      type: DataTypes.TEXT,
    },
    deleted: {
      type: DataTypes.INTEGER,
    },

    is_approved: {
      type: DataTypes.INTEGER,
    },
    step: {
      type: DataTypes.INTEGER,
    },

    created_at: {
      type: DataTypes.TEXT,
    },
    updated_at: {
      type: DataTypes.TEXT,
    },
  });

module.exports = Merchant;
