const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("../db/connection");
const User = require("../model/userSchema");

// registration api
router.post("/user-register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ status: 422, message: "Pls fill all the field" });
  }

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({ status: 409, message: "User already created by this email" });
    }
    const hash = await bcrypt.hash(password, 12);
    const user = new User({ name: name, email: email, password: hash });
    await user.save();

    const userData = { name: user.name, email: user.email, role: "user" };
    const token = jwt.sign({ user: userData }, process.env.SECRET_KEY);
    res.cookie("token", token, { expires: new Date(Date.now() + 864000000), httpOnly: true });

    return res.status(201).json({
      status: 201,
      message: "User registration successfully",
      user: userData,
    });
  } catch (error) {
    console.log("register failed:", error);
  }
});

// login api
router.post("/user-login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ status: 422, message: "Pls fill all the field" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const userData = { name: user.name, email: user.email, role: "user" };

        const token = jwt.sign({ user: userData }, process.env.SECRET_KEY);

        res.cookie("token", token, { expires: new Date(Date.now() + 864000000), httpOnly: true });

        return res.status(200).json({
          status: 200,
          message: "User successfully logged in",
          user: userData,
        });
      } else {
        return res.status(403).json({ status: 403, message: "Password did not match" });
      }
    }
    return res.status(404).json({ status: 404, message: "User not found,Pls register first" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// 864000000
