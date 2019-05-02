const mongoose = require("mongoose");

// table blueprint
const post_schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is Required"
    },
    content: {
      type: String,
      required: "Content is Required"
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: "Comment is Required field"
      }
    ]
  },
  {
    timestamps: true
  }
);

// register Post table and export
module.exports = mongoose.model("Post", post_schema);
