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
    let response = awaitResponse(req.body.msg);

    response.then(data => {
      console.log("Server return data : " + data);
      res.status(200);
      res.json({ msg: data });
      next();
    });
  }

  async function awaitResponse(info) {
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
};
module.exports = api;
