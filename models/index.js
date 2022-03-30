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

const Pharmacy = require("./pharmacy.model")(
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
const CommentPharmacy = require("./comment-pharmacy.model")(
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

const CommentSchoolLoan = require("./comment-school-loan.model")(
  sequelize,
  DataTypes,
  Sequelize
);

const CommentTeacherLoan = require("./comment-teacher-loan.model")(
  sequelize,
  DataTypes,
  Sequelize
);

const ApprovalWorkFlow = require("./approval-work-flow.model")(
  sequelize,
  DataTypes,
  Sequelize
);

const ApprovalWorkFlowPharmacy = require("./approval-work-flow-pharmacy.model")(
  sequelize,
  DataTypes,
  Sequelize
);

const ApproveFlow = require("./approve-flow.model")(
  sequelize,
  DataTypes,
  Sequelize
);

const ApprovalWorkFlowHouse = require("./house-workflow.model")(
  sequelize,
  DataTypes,
  Sequelize
);

const ApprovalWorkFlowTeacher = require("./teacher-workflow.model")(
  sequelize,
  DataTypes,
  Sequelize
);

const CrawlingRecord = require("./crawling-record.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const ApprovalWorkFlowSchool = require("./school-workflow.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const Teacher = require("./teachers.model")(sequelize, DataTypes, Sequelize);
const ApprovalWorkFlowRent = require("./rent-workflow.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const ApprovalWorkFlowAgent = require("./agent-workflow.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const CommentAgent = require("./comment-agent.model")(
  sequelize,
  DataTypes,
  Sequelize
);
const Agent = require("./agent.model")(sequelize, DataTypes, Sequelize);
module.exports = {
  Agent,
  CommentAgent,
  ApprovalWorkFlowAgent,
  ApprovalWorkFlowRent,
  Teacher,
  ApprovalWorkFlowSchool,
  CrawlingRecord,
  ApprovalWorkFlowTeacher,
  ApprovalWorkFlowHouse,
  ApproveCrawledProperty,
  CrawledProperty,
  ApproveHouse,
  Restaurant,
  ApproveRestaurant,
  ListHouse,
  CommentRestaurant,
  CommentRequest,
  CommentHouse,
  CommentSchoolLoan,
  CommentTeacherLoan,
  ApprovalWorkFlow,
  ApproveFlow,
  sequelize,
  Pharmacy,
  ApprovalWorkFlowPharmacy,
  CommentPharmacy,
  Sequelize,
};
