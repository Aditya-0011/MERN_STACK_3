const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");

const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(process.env.DB_STRING)
  .then((result) => {
    console.log("Database Connected");
    app.listen(process.env.APP_PORT || 1010);
    console.log(`App is running on port ${process.env.APP_PORT || 1010}`);
  })
  .catch((e) => console.log(`Db Connection Error ${e}`));
