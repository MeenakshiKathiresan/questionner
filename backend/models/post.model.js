const { mongoose, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    username: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
