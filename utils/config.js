// config.js
require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV || "development";

const JWT_SECRET =
  NODE_ENV === "production" ? process.env.JWT_SECRET : "super~secret~code";
const MONGO_ADDRESS =
  NODE_ENV === "production"
    ? process.env.PROD_DB_ADDRESS
    : "mongodb://127.0.0.1:27017/slaylist";

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  MONGO_ADDRESS,
};
