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
const Approval = require("./approval.model")(sequelize, DataTypes, Sequelize);
const Comment = require("./comment.model")(sequelize, DataTypes, Sequelize);
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
module.exports = {
  ApproveHouse,
  Restaurant,
  Approval,
  ListHouse,
  Comment,
  CommentRequest,
  CommentHouse,
  sequelize,
};
