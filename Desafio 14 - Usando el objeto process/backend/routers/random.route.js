import express from "express";
import * as auth from "../middlewares/authenticate.js";
import parseArgs from "minimist";
import { fork } from "child_process";

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
      res.send(msg);
    }
  });
});

export default random;
