let api = {};
let io = require("../socket/miles");

api.getCredencials = async (req, res, next) => {
  res.json({
    localAddress: io.localAddress,
    localPort: io.localPort,
    remoteAddress: io.remoteAddress,
    remotePort: io.remotePort
  });
  next();
};

api.sendQuestion = async (req, res, next) => {
  if (req.body && req.body.msg) {
    let response = await awaitResponse(req.body.msg);

    if (response) {
      console.log("Server return data : " + response);
      res.status(200);
      res.json({ msg: response });
      next();
    }
  }
};

function awaitResponse(info) {
  return new Promise((resolve, reject) => {
    io.write(info);
    io.on("data", msg => {
      if (msg) {
        resolve(msg);
      } else {
        reject(Error("Error server chat"));
      }
    });
  });
}

module.exports = api;
