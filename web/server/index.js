const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const io = require("./client");
const port = process.env.PORT || 3000;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// parse application/json
app.use(bodyParser.json());
app.use(express.static("../web-eventum/dist/web-eventum")); //liberando uma pasta para ser acessivel ao navegador

app.get("/msg", (req, res) => {
  console.log("otavio acorda");
  io.write('Eu amo isso');
});
http.listen(port, () =>
  console.log(`iam bb8 ready and listening on port ${port}!`)
);
