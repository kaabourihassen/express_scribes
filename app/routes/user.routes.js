const { authJwt } = require('../middlewares')
const controller = require('../controllers/user.controller')
const multer = require("multer");
const User = require("../models/user.model");
const router = require("express").Router();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard)
  router.put('/changeGeneralInfos/:id',[authJwt.verifyToken],controller.changeGeneralInfos)
  app.use('/user', router);
}
