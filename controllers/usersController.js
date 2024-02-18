const User = require("./../models/User.js");
const bcrypt = require("bcrypt");
const createToken = require("./../utilities/createJWT.js");
const { validationResult } = require("express-validator");
const validatepass = require("./../middleware/validatepassword.js");
const{ httpresponse} = require('./../utilities/httpResponse.js')
const responsemsg = require('./../utilities/responsemsg.js')

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
    httpresponse(res,200,responsemsg.SUCCESS,"Successfully Registered",null)
  } else {
    httpresponse(res,200,responsemsg.FAIL,null,er)
  }
};

const login = async (req, res) => {
  const cominguser = await req.body;
  let user = await User.find({ phone: cominguser.phone });
  if (user.length == 0) {
    httpresponse(res,200,responsemsg.FAIL,{token:null},"User Not Found",null);
  }else {
    let valresult = await validatepass(cominguser.password, user[0].password);
    if (valresult) {
      let token = createToken({
        username: user[0].username,
        phone: user[0].phone,
        type: user[0].type
      })

      httpresponse(res,200,responsemsg.SUCCESS,{token},null)
    } else {
      httpresponse(res,200,responsemsg.FAIL,{token:null},"Wrong Password")
    }
  }
};

module.exports = {
  register,
  login,
};
