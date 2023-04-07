const { mongoose, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    heading: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      validate: [sizeLimit, "Limit reached"],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

function sizeLimit(val) {
  return val.length <= 10;
}

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
