let net = require("net");
let app = require("../morales_chat");
let chalk = require('chalk');
require('dotenv').config()

function getConn(connName) {
  var option = {
    host: process.env.SERVER_CHAT_HOST,
    port: process.env.SERVER_CHAT_PORT
  };

  var client;
  try {
    // Create TCP client.
    client = net.createConnection(option, () => {
      console.log("Connection name : " + connName);
      console.log(chalk.red(
        "Connection local address : " +
          client.localAddress +
          ":" +
          client.localPort
      ));
      console.log(chalk.red(
        "Connection remote address : " +
          client.remoteAddress +
          ":" +
          client.remotePort
      ));
    });
  } catch (e) {
    throw Error(
      "Chat server is not listening, waiting for response ... \n" +
        e.name +
        "\n" +
        e.message
    );
  }

  client.setTimeout(2000);
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
let nodeClient = getConn("Node");

module.exports = nodeClient;
