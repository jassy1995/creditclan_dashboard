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

// require("dotenv").config();
// WorkoutExercises.hasMany(Day, { foreignKey: "workout_id" });
// Day.belongsTo(WorkoutExercises, {
//   foreignKey: "workout_id",
//   targetKey: "workout_id",
// });

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

const PORT = process.env.PORT || 2022;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
