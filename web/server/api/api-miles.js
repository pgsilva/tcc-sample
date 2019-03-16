let api = {};
let io = require("../socket/miles");

api.getCredencials = async (req, res) => {
  res.json({
    localAddress: io.localAddress,
    localPort: io.localPort,
    remoteAddress: io.remoteAddress,
    remotePort: io.remotePort
  });
};

api.sendQuestion = async (req, res) => {
  if (req.body && req.body.msg) {
    await io.write(req.body.msg);

    await io.on("data", msg => {
      console.log("Server return data : " + msg);
      res.json({
        data: msg,
        time: new Date().toISOString()
      });
    });
  } else {
    res.send(Error("Erro no corpo da requisicao")).status(500);
  }
};

module.exports = api;
