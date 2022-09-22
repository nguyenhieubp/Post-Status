const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Please enter content"],
      trim: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
