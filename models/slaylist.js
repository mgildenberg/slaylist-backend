const mongoose = require("mongoose");

const slaylistSchema = new mongoose.Schema({
  category: { type: String, required: true },

  title: { type: String, required: true, minlength: 3, maxlength: 100 },

  tagline: { type: String, maxlength: 100 },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

  owner: { type: mongoose.Schema.Types.ObjectId, required: true },

  createdAt: { type: Date, required: true, default: Date.now },

  lastModifiedAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("slaylists", slaylistSchema);
