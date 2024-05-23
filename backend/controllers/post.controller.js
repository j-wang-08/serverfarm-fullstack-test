const mongodb = require("../models");
const Post = mongodb.posts;

// Create and save a new post
const create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.content) {
    res.status(400).send({ message: "Title or content cannot be empty" });
  }

  const userId = req.userData.user.id;

  // Create a post
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    userId: userId,
  });

  post
    .save()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while creating a new Post",
      })
    );
};

// Retrieve all Posts
const findAll = (req, res) => {
  const userId = req.userData.user.id;

  Post.find({ userId: userId })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts",
      })
    );
};

// Find a post with post id and user id
const findOne = (req, res) => {
  const userId = req.userData.user.id;
  const postId = req.params.id;

  Post.findById(postId)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Not found post with id=${postId}` });
      } else if (data.userId !== userId) {
        res.status(404).send({
          message: `Not found post with id=${postId} and userId=${userId}`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: `Some error occurred while retrieving post with id=${postId}`,
      })
    );
};

// Update a post
const update = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const postId = req.params.id;
  const userId = req.userData.user.id;

  Post.findByIdAndUpdate(
    postId,
    { ...req.body, userId },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update post with id=${postId}}. Maybe post was not found`,
        });
      } else {
        res.send({ message: "Post was updated successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error occurred while updating post with id=${postId}`,
      });
    });
};

// Delete post with post id
const deleteOne = (req, res) => {
  const postId = req.params.id;
  const userId = req.userData.user.id;

  Post.findByIdAndRemove(postId, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete post with id=${postId}. Maybe post was not found`,
        });
      } else {
        res.send({
          message: "Post was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error occurred while deleting post with id=${postId}`,
      });
    });
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
};
