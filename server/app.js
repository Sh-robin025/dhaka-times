const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./.env.local" });

const port = process.env.PORT || 8888;

require("./db/connection");

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(require("./router/userAuth"));
app.use(require("./router/adminAuth"));
app.use(require("./router/auth"));
app.use(require("./router/news"));

app.get("/", (req, res) => {
  res.send("The Dhaka Times Server Created By Express App !");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
