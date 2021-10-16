const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// user authenticate api
router.get("/authenticate", authenticate, (req, res) => {
  res.status(200).json({ status: 200, user: req.user });
});

// logout api

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "logout successfull" });
});

module.exports = router;
