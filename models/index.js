const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,

  pool: {
    ...dbConfig.pool,
  },
});

const Restaurant = require("./restaurant.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const ApproveHouse = require("./approve-house.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const ApproveRestaurant = require("./approve-restaurant.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const CommentRestaurant = require("./comment-restaurant.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const ListHouse = require("./house-list.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const CommentHouse = require("./comment-house.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const CommentRequest = require("./comment-request.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const CrawledProperty = require("./crawled-property.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const ApproveCrawledProperty = require("./approve-crawled-property.model")(
  sequelize,
  DataTypes,
  Sequelize
);

module.exports = {
  ApproveCrawledProperty,
  CrawledProperty,
  ApproveHouse,
  Restaurant,
  ApproveRestaurant,
  ListHouse,
  CommentRestaurant,
  CommentRequest,
  CommentHouse,
  sequelize,
  Sequelize,
};
