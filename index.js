// index.js
const express = require("express");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(requestLogger);

app.use(errorLogger); // enabling the error logger

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
