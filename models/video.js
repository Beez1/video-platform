const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  uploaded_by: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("video", videoSchema);
