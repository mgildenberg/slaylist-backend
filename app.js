// index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");
const { errors } = require("celebrate");

require("dotenv").config();

console.log(process.env.NODE_ENV); // production

mongoose
  .connect("mongodb://127.0.0.1:27017/slaylist")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);
// listen to port 3001
const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use("/", mainRouter);

app.use(errorLogger); // enabling the error logger

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
