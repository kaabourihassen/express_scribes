const posts = require("../controllers/post.controller.js");
const {authJwt} = require("../middlewares");
module.exports = app => {
  const { authJwt } = require('../middlewares')
  const posts = require("../controllers/post.controller.js");

  const router = require("express").Router();

  router.post("/", [authJwt.verifyToken], posts.create);
  router.post("/:id/comment", [authJwt.verifyToken], posts.createComment);
  router.get("/", [authJwt.verifyToken], posts.findAll);
  router.get("/published", [authJwt.verifyToken], posts.findAllPublished);
  router.get("/:id", [authJwt.verifyToken], posts.findOne);
  router.put("/:id", [authJwt.verifyToken], posts.update);
  router.delete("/:id", [authJwt.verifyToken], posts.delete);

  app.use('/posts', router);
};