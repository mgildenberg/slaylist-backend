// index.js

const express = require("express");
// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
