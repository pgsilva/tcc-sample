const express = require("express");
const app = express();
const http = require("http").Server(app);
let chalk = require('chalk');
require('dotenv').config()

const port = process.env.SERVER_PORT;

//angular app
app.use(express.static("../web-eventum/dist/web-eventum"));

http.listen(port, () =>
  console.log(chalk.green(`morales ready and listening on port ${port}!`))
);

