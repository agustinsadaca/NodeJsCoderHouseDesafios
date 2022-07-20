import express from 'express'
import * as AuthController from '../controllers/auth.controllerTest.js'
import * as auth from '../middlewares/authenticate.js'



const routerInfo = express.Router()

/* -------------------------------------------------------------------------- */
/*                                  Productos                                 */
/* -------------------------------------------------------------------------- */

routerInfo.get("/",(req, res, next) => {

    
    res.send('info')

});

export default routerInfo