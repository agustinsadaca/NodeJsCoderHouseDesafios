import { fork } from 'child_process';
import express from 'express';
import { cpus } from 'os';

const random = express.Router();

/* -------------------------------------------------------------------------- */
/*                                  Productos                                 */
/* -------------------------------------------------------------------------- */

random.get("/:random", (req, res, next) => {
  let { random } = req.params;
  const forked = fork("./backend/utils/randomNumbers.js");

  forked.on("message", (msg) => {
    if (msg === "listo") {
      
      forked.send(random);
    } else {
      msg.nCpus = cpus.length
      console.log(msg);


      res.send(msg);
    }
  });
});

random.get("/", (req, res, next) => {
  const forked = fork("./backend/utils/randomNumbers.js");

  forked.on("message", (msg) => {
    if (msg === "listo") {
    
      forked.send(null);
    } else {
      msg.nCpus = cpus.length
      res.send(msg);
    }
  });
});

export default random;
