import express from 'express'
import * as AuthController from '../controllers/auth.controllerTest.js'
import * as auth from '../middlewares/authenticate.js'
import parseArgs from 'minimist';



const routerInfo = express.Router()

/* -------------------------------------------------------------------------- */
/*                                  Productos                                 */
/* -------------------------------------------------------------------------- */

routerInfo.get("/",(req, res, next) => {
    const {p} = parseArgs(process.argv)
    const processData = {
        argumentoEntrada: p,
        nombrePlataforma : process.platform,
        version : process.version,
        memoria : process.memoryUsage(),
        pathEjecucion : process.cwd(),
        pid : process.pid,
        carpetaProyecto : process.cwd()
    }

    res.send(processData)

});

export default routerInfo