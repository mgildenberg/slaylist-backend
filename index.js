// index.js
const express = require("express");
const cors = require("cors");
// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
