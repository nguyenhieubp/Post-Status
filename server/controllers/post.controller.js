const Post = require("../models/post.schema");
module.exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name createdAt")
      .select("content createdAt");
    res.status(200).json({
      message: "success",
      result: posts.length,
      data: posts,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const newPost = await new Post({ ...req.body, author: userId }).save();
    res.json({ message: "CREATE POST SUCCESS", data: newPost });
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports.putPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const postUpdate = await Post.updateOne(
      { _id: postId },
      { $set: { content: req.body.content } }
    );
    res.json({ message: "PUT SUCCESS", data: postUpdate });
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.remove({ _id: postId });
    res.json({ message: "DELETE SUCCESS" });
  } catch (error) {
    res.json({ message: error });
  }
};
