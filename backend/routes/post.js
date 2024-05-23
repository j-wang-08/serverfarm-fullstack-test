const router = require("express").Router();
const {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
} = require("../controllers/post.controller");

// Create a new post
router.post("/", create);

// Retrieve all posts
router.get("/", findAll);

// Retrieve a post with id
router.get("/:id", findOne);

// Update a post with id
router.put("/:id", update);

// Delete a post with id
router.delete("/:id", deleteOne);

module.exports = router;
