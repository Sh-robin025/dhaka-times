const jwt = require("jsonwebtoken");
const Admin = require("../model/adminSchema");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=").slice(1, 2)[0];

    const varifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (varifyToken.user) {
      const { name, email } = await User.findOne({ email: varifyToken.user.email });

      req.user = { name: name, email: email, role: "user" };
    } else if (varifyToken.admin) {
      const { name, email } = await Admin.findOne({ email: varifyToken.admin.email });

      req.user = { name: name, email: email, role: "admin" };
    } else {
      throw new Error("User not found");
    }

    next();
  } catch (err) {
    res.status(401).json({ status: 401, message: "Unauthorized:No Token provided." });
  }
};

module.exports = authenticate;
