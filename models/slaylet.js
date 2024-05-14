const mongoose = require("mongoose");
const validator = require("validator");

const slayletSchema = new mongoose.Schema({
  link: {
    type: String,
    required: [true, "The entry's channel URL is required."],
    validate: {
      validator: function validateURL(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },

  handle: { type: String, maxlength: 45 },
  notes: { type: String, maxlength: 300 },

  listOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "slaylist",
    required: true,
  },
});

module.exports = mongoose.model("slaylets", slayletSchema);
