const User = require("../models/user.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res) => {
  const user = new User(req.body);
  const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
  try {
    await user.save();
    res.json({ message: "success", data: { token, nameUser: user.name } });
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      //ERROR
      // res.json({ message: "Not matches email. Please register email" });
      const err = new Error("Not matches email. Please register email");
      err.status = 400;
      return next(err);
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
      res.json({ message: "success", data: { token, nameUser: user.name } });
    } else {
      //ERROR
      const err = new Error("Password not matches !");
      err.status = 400;
      return next(err);
      // res.json({ message: "Password not matches !" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports.getCurrentUser = async (req, res) => {
  try {
    const data = { user: null };
    if (req.user) {
      const user = await User.findOne({ _id: req.user.userId });
      data.user = user.name;
    }
    res.json({ message: "success", data: data });
  } catch (error) {
    res.json({ message: error });
  }
};
