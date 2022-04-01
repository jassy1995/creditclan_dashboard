const express = require("express");
const app = express();
const cors = require("cors");
const { Agent, Restaurant, sequelize } = require("./models");

const restaurantRoutes = require("./routes/restaurant.route");
const houseRoutes = require("./routes/house.route");
const rentRequestRoute = require("./routes/rent-request.route");
const crawledPropertyRoute = require("./routes/crawled-property.route");
const schoolRoute = require("./routes/school.route");
const teacherRoute = require("./routes/teacher.route");
const agentRoute = require("./routes/agent.route");
const merchantRoute = require("./routes/merchant.route");
const pharmacyRoute = require("./routes/pharmacy.route");

Agent.hasMany(Restaurant, { foreignKey: "agent_id" });
Restaurant.belongsTo(Agent, {
  foreignKey: "agent_id",
  targetKey: "id",
});
sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(restaurantRoutes);
app.use(houseRoutes);
app.use(rentRequestRoute);
app.use(crawledPropertyRoute);
app.use(schoolRoute);
app.use(teacherRoute);
app.use(agentRoute);
app.use(merchantRoute);
app.use(pharmacyRoute);

const PORT = process.env.PORT || 2022;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
