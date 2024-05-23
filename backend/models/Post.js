module.exports = (mongoose) => {
  const postSchema = mongoose.Schema(
    {
      title: String,
      content: String,
      userId: Number,
    },
    {
      timestamps: true,
    }
  );

  const Post = mongoose.model("post", postSchema);
  return Post;
};
