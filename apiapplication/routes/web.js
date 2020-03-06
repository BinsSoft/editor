var express 	     = require('express');
var router 	         = express.Router();
const apiPrefix      = '/api/1.0';

router.post(apiPrefix+"/signin",  global.controllers.AuthController.signin);
// router.get(apiPrefix+"/getAllUser/", AuthMiddleware.verifySessionToken,  global.controllers.UserController.getAllUser);
// router.get(apiPrefix+"/allUserByUserType/:usertype", AuthMiddleware.verifySessionToken,  global.controllers.UserController.allUserByUserType);
// router.get(apiPrefix+"/userById/:userId", AuthMiddleware.verifySessionToken,  global.controllers.UserController.userById);
// router.post(apiPrefix+"/userLogin", AuthMiddleware.verifySessionToken,  global.controllers.UserController.userLogin);
// router.post(apiPrefix+"/createUser", AuthMiddleware.verifySessionToken,  global.controllers.UserController.createUser);
// router.post(apiPrefix+"/updateUser/:id", AuthMiddleware.verifySessionToken,  global.controllers.UserController.updateUser);
// router.post(apiPrefix+"/insertOrUpdate/:id", AuthMiddleware.verifySessionToken,  global.controllers.UserController.insertOrUpdate);
// router.post(apiPrefix+"/uniqueEmailcheck/:email", AuthMiddleware.verifySessionToken,  global.controllers.UserController.uniqueEmailcheck);
// router.delete(apiPrefix+"/userDelete/:id", AuthMiddleware.verifySessionToken,  global.controllers.UserController.deleteUser);

module.exports = router;