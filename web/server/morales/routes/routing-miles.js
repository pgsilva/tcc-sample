
let express = require('express');
let router = express.Router();
let api = require('../api/api-miles');

router.route('/msg')
      .get(api.getCredencials)
      .post(api.sendQuestion);

module.exports = router;