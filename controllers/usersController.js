const User = require("./../models/User.js");
const bcrypt = require("bcrypt");
const createToken = require("./../utilities/createJWT.js");
const { validationResult } = require("express-validator");
const validatepass = require("./../middleware/validatepassword.js");

const register = async (req, res) => {
  let data = await req.body;
  let errors = await validationResult(req);
  let er = errors.array().map((e) => e.msg);

  if (er.length == 0) {
    let hashedpass = await bcrypt.hash(data.password, 6);

    let newuser = await new User({
      username: data.username,
      password: hashedpass,
      phone: data.phone,
      gender: data.gender,
      type: data.type,
    });
    newuser.save();
    // const token = createToken({
    //     username:data.username
    // })
    let msg = "Welcome " + data.username;
    res.status(200).json({
      status: "success",
      data: {
        token: msg,
      },
      errors: [],
    });
  } else {
    res.status(200).json({
      status: "Fail",
      data: {},
      errors: er,
    });
  }
};

const login = async (req, res) => {
  const cominguser = await req.body;
  let user = await User.find({ phone: cominguser.phone });
  if (user.length == 0) {
    res.json({
      status: "Fail",
      token: null,
      errors: "User Not Found",
    });
  } else {
    let valresult = await validatepass(cominguser.password, user[0].password);
    if (valresult) {
      // let token = await createToken({
      //     username:user.username
      // })
      let msg = "Welcome " + user[0].username;
      res.status(200).json({
        status: "success",
        token: msg,
        errors: null,
      });
    } else {
      res.json({
        status: "Fail",
        token: null,
        errors: "Passwords Doesn't Match",
      });
    }
  }
};

module.exports = {
  register,
  login,
};
