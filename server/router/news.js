const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

require("../db/connection");
const News = require("../model/newsSchema");

// this api works for new update news add or publish
router.post("/addNews", async (req, res) => {
  try {
    const newNews = await News.create(req.body);
    await newNews.save();
    return res.status(200).json({ status: 201, message: "news added successfully" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Server error,Try again later." });
  }
});

// this api works for get all news from database
router.get("/allNews", async (req, res) => {
  const news = await News.find();
  return res.status(200).json({ status: 200, data: news });
});

router.get("/category/:category", async (req, res) => {
  const news = await News.find({ category: req.params.category });
  return res.status(200).json({ status: 200, data: news });
});

// this api works for get single news
router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const selectedNews = await News.findOne({ _id: id });

    return res.status(200).json({ status: 200, data: selectedNews });
  } catch (error) {
    return res.status(500).json({ status: 424, message: "Server error,Try again later." });
  }
});

// this api works for update single news field
router.put("/updateContent/:id", async (req, res) => {
  const { id } = req.params;
  const { headline, image, news, img_cap, meta_desc } = req.body;

  try {
    let response = {};
    headline && (response = await News.updateOne({ _id: id }, { $set: { headline: headline } }));
    news && (response = await News.updateOne({ _id: id }, { $set: { news: news } }));
    meta_desc && (response = await News.updateOne({ _id: id }, { $set: { meta_desc: meta_desc } }));
    img_cap &&
      (response = await News.updateOne(
        { _id: id },
        { $set: { img_cap: img_cap } },
        { upsert: true },
      ));
    image && (await News.updateOne({ _id: id }, { $set: { image: image } }));

    response.modifiedCount === 1 &&
      res.status(200).json({ status: 200, message: "Content updated successfully." });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Server error,Try again later." });
  }
});

// this api works for delete news from database;
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await News.deleteOne({ _id: id });
    result.deletedCount === 1 &&
      res.status(200).json({ status: 200, message: "News deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Server error,Try again later." });
  }
});

module.exports = router;
