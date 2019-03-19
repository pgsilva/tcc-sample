const cluster = require("cluster");
let chalk = require('chalk');

if (cluster.isMaster) {
  let cont = 1;
  let worker1 = cluster.fork({ WorkerName: "worker1" });

  cluster.on("listening", worker => {
    console.log(`cluster ${worker.process.pid} conectado`);
  });

  cluster.on("disconnect", worker => {
    console.log(`cluster ${worker.process.pid} desconectado`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`cluster ${worker.process.pid} perdido`);
    if (worker == worker1) {
      console.log(chalk.red("tentativa: " + cont));
      setTimeout(() => {
        cont++;
        if (cont < 10) {
          worker1 = cluster.fork({ WorkerName: "worker1" });
        } else {
          worker1 = cluster.fork({ WorkerName: "worker2" });
          console.log(chalk.red("worker 1 nao subiu, alternando para o worker 2"));
        }
      }, 10000);
    }
  });
} else {
  if (process.env.WorkerName == "worker1") {
    require("./morales/morales_chat");
  } else {
    require("./morales/morales_nochat");
  }
}
