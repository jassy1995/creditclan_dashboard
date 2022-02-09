const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require("./models");

const restaurantRoutes = require("./routes/restaurant.route");
const houseRoutes = require("./routes/house.route");
const rentRequestRoute = require("./routes/rent-request.route");
const crawledPropertyRoute = require("./routes/crawled-property.route");

// require("dotenv").config();
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

const PORT = process.env.PORT || 2022;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
