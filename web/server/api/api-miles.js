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
    await io.write(req.body.msg);
  // TODO request bate primeiro o write depois o data, testar com write em functions separadas 
  //  let response = await awaitResponse();
    console.log(response);
    res.send("ok");

    // if (response) {
    //   res.status(200);
    //   res.json({ msg: response });
    //   next();
  } else {
    res.send(Error("Erro no corpo da requisicao")).status(500);
  }
};

async function awaitResponse() {
  io.on("data", msg => {
    console.log("Server return data : " + msg);
    return msg;
  });
}
module.exports = api;
