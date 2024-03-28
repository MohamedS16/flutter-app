const { body } = require("express-validator");
const User = require("../models/User.js");
const Doer = require("../models/Doer.js");

module.exports = () => {
  return [
    body("username").notEmpty().withMessage("Username is Required"),
    body("password").notEmpty().withMessage("Password is Required"),
    body("phone")
      .notEmpty()
      .withMessage("Phone is Required")
      .isMobilePhone()
      .withMessage("This is not a Phone Number")
      .custom(async (value) => {
        let existingUser = await User.find({ phone: value });
        let existingDoer = await Doer.find({ phone: value });
        if (existingUser.length != 0 || existingDoer.length != 0) {
          // Will use the below as the error message
          // console.log(existingUser);
          throw new Error("A user already exists with this Phone Number");
        }
      }),
    body("device")
      .notEmpty()
      .withMessage("Device is Required")
      .isIn(["Android", "Iphone"])
      .withMessage("Type Must Be Anrdoid or Iphone"),
    body("country").notEmpty().withMessage("Country is Required"),
    body("registered").notEmpty().withMessage("Register Date is Required"),
    body("lastLogged")
      .notEmpty()
      .withMessage("Last Logged in Time is Required"),
    body("gender")
      .notEmpty()
      .withMessage("Gender is Required")
      .isIn(["Male", "Female"])
      .withMessage("Type Must Be Male or Female"),
  ];
};
