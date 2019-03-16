let net = require("net");
let app = require("../morales");

function getConn(connName) {
  var option = {
    host: "127.0.0.1",
    port: 5000
  };

  // Create TCP client.
  var client = net.createConnection(option, () => {
    console.log("Connection name : " + connName);
    console.log(
      "Connection local address : " +
        client.localAddress +
        ":" +
        client.localPort
    );
    console.log(
      "Connection remote address : " +
        client.remoteAddress +
        ":" +
        client.remotePort
    );
  });

  //client.setTimeout(2000);
  client.setEncoding("utf8");

  client.on("end", () => {
    console.log("Client socket disconnect. ");
  });

  client.on("timeout", () => {
    console.log("Client connection timeout. ");
  });

  return client;
}

// Create node client socket.
var nodeClient = getConn("Node");

module.exports = nodeClient;
