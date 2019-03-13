const express = require('express')
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express()
const port =  process.env.PORT||3000

app.use(cors())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
app.use(express.static('../web-eventum/dist/web-eventum')); //liberando uma pasta para ser acessivel ao navegador

app.listen(port, () => console.log(`iam bb8 ready and listening on port ${port}!`))
