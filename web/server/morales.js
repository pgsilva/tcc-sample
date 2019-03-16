const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const route = require("./routes/routing-miles");

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// parse application/json
app.use(bodyParser.json());
//angular app
app.use(express.static("../web-eventum/dist/web-eventum"));

//ENDPOINTS CONFIG
let logger = (req, res, next) => {
  //TODO config authentication
  req.logger = new Date().toISOString();
  console.log("[LOG] Requested at: " + req.logger + "");
  next();
};
app.use(logger);
app.use("/morales/chat", route);

http.listen(port, () =>
  console.log(`morales ready and listening on port ${port}!`)
);

module.exports = app;
