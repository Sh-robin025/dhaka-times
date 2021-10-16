const mongoose = require("mongoose");

const DB = process.env.DB_URI;

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected successfully"))
  .catch(err => console.error("db connection error:", err));
