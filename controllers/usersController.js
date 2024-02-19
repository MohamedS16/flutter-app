const User = require("./../models/User.js");
const bcrypt = require("bcrypt");
const createToken = require("./../utilities/createJWT.js");
const { validationResult } = require("express-validator");
const validatepass = require("./../middleware/validatepassword.js");
const{ httpresponse} = require('./../utilities/httpResponse.js')
const responsemsg = require('./../utilities/responsemsg.js')
const verify = require('./../middleware/verifyJWT.js')


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

      httpresponse(res,200,responsemsg.SUCCESS,{token,username: user[0].username,type: user[0].type, gender: user[0].gender},null)
    } else {
      httpresponse(res,200,responsemsg.FAIL,{token:null},"Wrong Password")
    }
  }
};

const updateprofile = async (req,res)=>{
    let newdata = await req.body
    const token = await req.headers.authtoken

    if(token){
      try{
        let olddata = await verify(token,process.env.JWT)
        let hashedpass = await bcrypt.hash(newdata.password,6)
        let updatedata = await User.updateOne({phone:olddata.phone},{
          username: newdata.username,
          password: hashedpass,
          phone: newdata.phone
        })

        if(updatedata.modifiedCount == 0 ){
          httpresponse(res,200,responsemsg.FAIL,null,"Nothing Updated, Please Try Again")
        }else{
          let token = createToken({
            username:newdata.username ,
            phone: newdata.phone,
            type: newdata.type
          })

          httpresponse(res,200,responsemsg.SUCCESS,{msg:"Updated Successfully",token},null)

        }
      }catch(er){
        httpresponse(res,200,responsemsg.FAIL,null,"Invalid Token")
      }

    }else{
      httpresponse(res,200,responsemsg.FAIL,null,"Please Login First")
    }

}

module.exports = {
  register,
  login,
  updateprofile
};
