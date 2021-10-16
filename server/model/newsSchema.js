const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    headline: { type: String, require: true },
    meta_desc: { type: String, required: true },
    news: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    img_cap: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true },
);

const News = mongoose.model("News", newsSchema);
module.exports = News;
