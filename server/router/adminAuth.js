const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("../db/connection");
const Admin = require("../model/adminSchema");

// admin add
router.post("/add-admin", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).json({ status: 422, message: "Email must be provided" });
  }

  try {
    const exist = await Admin.findOne({ email: email });
    if (exist) {
      return res
        .status(409)
        .json({ status: 409, message: `${email} already listed in admin list.` });
    } else {
      const newAdmin = await new Admin({ email: email });
      await newAdmin.save();
      return res
        .status(200)
        .json({ status: 201, message: `${email} is now permitted for administration.` });
    }
  } catch (error) {
    console.log("add admin error: ", error);
  }
});

// registration api
router.post("/admin-register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ status: 422, message: "Pls fill all the field" });
  }

  try {
    const adminAccess = await Admin.findOne({ email: email });

    if (!adminAccess) {
      return res
        .status(405)
        .json({ status: 405, message: "This email cannot be permitted for admin registration." });
    } else if (adminAccess.password) {
      return res.status(409).json({ status: 409, message: "Already registered." });
    }

    const hash = await bcrypt.hash(password, 12);
    const admin = { name: name, email: email, password: hash };
    await Admin.updateOne({ email: email }, admin);

    const adminData = { name: admin.name, email: admin.email, role: "admin" };
    const token = jwt.sign({ admin: adminData }, process.env.SECRET_KEY);
    res.cookie("token", token, { expires: new Date(Date.now() + 864000000), httpOnly: true });

    return res.status(201).json({
      status: 201,
      message: "Admin registration successful",
      user: adminData,
    });
  } catch (error) {
    console.log("admin registration error", error);
  }
});

// login api
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ status: 422, message: "Pls fill all the field" });
  }

  try {
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(404).json({ status: 404, message: "Admin not found,Pls register first" });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (match) {
      const adminData = { name: admin.name, email: admin.email, role: "admin" };
      const token = jwt.sign({ admin: adminData }, process.env.SECRET_KEY);
      res.cookie("token", token, { expires: new Date(Date.now() + 864000000), httpOnly: true });

      return res.status(200).json({
        status: 200,
        message: "Admin successfully logged in",
        user: adminData,
      });
    }
    return res.status(403).json({ status: 403, message: "Password did not match" });
  } catch (error) {
    console.log("admin login error", error);
  }
});

// get all admin api
router.get("/all-admin", async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({ status: 200, data: admins });
});

// delete an admin by id api
router.delete("/delete-admin/:id", async (req, res) => {
  const { id } = req.params;
  const deleteAdmin = await Admin.deleteOne({ _id: id });
  deleteAdmin.deletedCount === 1
    ? res.status(200).json({ status: 200, message: "An admin deleted successfully" })
    : res.status(500).json({ status: 500, message: "Something went wrong" });
});

module.exports = router;
