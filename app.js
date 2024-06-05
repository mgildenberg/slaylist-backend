// index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/errorHandler");
const mainRouter = require("./routes/index");
const limiter = require("./middlewares/rateLimiter");

require("dotenv").config();

console.log(process.env.NODE_ENV); // production

const prodDbAddress =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_ADDRESS
    : "mongodb://127.0.0.1:27017/slaylist";

mongoose
  .connect(prodDbAddress)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

mongoose.set("strictQuery", true);
// listen to port 3002
const { PORT = 3002 } = process.env;

const app = express();

app.use(limiter);

app.use(helmet());

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use("/", mainRouter);

app.use(errorLogger); // enabling the error logger

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
