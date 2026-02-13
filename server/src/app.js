require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 100,
    max: 100,
  }),
);

module.exports = app;
