const { body } = require("express-validator");
const User = require("./../models/User.js");

module.exports = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username is Required"),
    body("password").notEmpty().withMessage("Password is Required"),
    body("phone")
      .notEmpty()
      .withMessage("Phone is Required")
      .isMobilePhone()
      .withMessage("This is not a Phone Number")
      .custom(async (value) => {
        let existingUser = await User.find({ phone: value });
        if (existingUser.length != 0) {
          // Will use the below as the error message
          console.log(existingUser);
          throw new Error("A user already exists with this Phone Number");
        } else {
        }
      }),
    body("gender")
      .notEmpty()
      .withMessage("Gender is Required")
      .isIn(["Male", "Female"])
      .withMessage("Type Must Be Male or Female"),
    body("type")
      .notEmpty()
      .withMessage("Type is Required")
      .isIn(["1", "2"])
      .withMessage("Type Must Be 1 or 2"),
  ];
};
