const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Please Enter Name"], minLength: 4 },
    email: { type: String, required: [true, "Enter email"] },
    password: { type: String, require: true, minLength: 8 },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  bcryptjs.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    } else {
      user.password = hash;
      next();
    }
  });
});

module.exports = mongoose.model("User", userSchema);
