const mongoose = require("mongoose");
const validator = require("validator");

const slayletSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: "You must enter a valid URL",
    },
  },
  notes: { type: String, maxlength: 300 },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

  listOwner: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("slaylets", slayletSchema);
