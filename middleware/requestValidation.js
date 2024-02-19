const { body } = require("express-validator");

module.exports = () => {
  return [
    body("customer").notEmpty().withMessage("Customer ID is Required"),

    body("for")
      .notEmpty()
      .withMessage("The Name of The Person You Are doing this for is Required"),

    body("type")
      .notEmpty()
      .withMessage("Type is Required")
      .isIn(["1", "2", "3"])
      .withMessage("Type Must Be 1 , 2 or 3"),

    body("case")
      .notEmpty()
      .withMessage("Case is Required")
      .isIn(["1", "2", "3", "4"])
      .withMessage("Case Must Be 1 , 2 , 3 or 4"),

    body("gender")
      .notEmpty()
      .withMessage("Gender is Required")
      .isIn(["1", "2"])
      .withMessage("Type Must Be Male or Female"),
  ];
};
