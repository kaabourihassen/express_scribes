const db = require("../models");
const Post = db.post;
const Comment = db.comment;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const post = new Post({
    author: req.userId,
    title: req.body.title,
    content: req.body.content,
    published: true
  });
  post.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the post."
      });
    });
};
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Post.find(condition).populate("comments")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findById(id).populate('comments')
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Post with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Post with id=" + id });
    });
};
exports.update = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  // console.log(post.author)
  // console.log(req.userId)
  if(post.author != req.userId){
    return res.status(401).send({
      message: `You can only update your own posts`
    })
  }else{
    Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Post with id=${id}. Maybe Post was not found!`
            });
          } else res.send({ message: "Post was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Post with id=" + id
          });
        });
  }
};
exports.delete = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if(post.author != req.userId){
    return res.status(401).send({
      message: `You can only delete your own posts`
    })
  }
  Post.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      } else {
        res.send({
          message: "Post was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
};
exports.findAllPublished = (req, res) => {
  Post.find({ published: true }).populate('comments')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.createComment = async (req, res) =>{
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const post = await Post.findOne({ _id: req.params.id });

  const comment = new Comment(
      {
        author: req.userId,
        post : req.params.id,
        content : req.body.content
      }
  );
  await comment.save();
  post.comments.push(comment._id);
  await post.save()
      .then(data => {
            res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Comment."
        });
      });
}