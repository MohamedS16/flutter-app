const User = require("./../models/User.js");
const bcrypt = require("bcrypt");
const createToken = require("./../utilities/createJWT.js");
const validatepass = require("./../middleware/validatepassword.js");
const { httpresponse } = require("./../utilities/httpResponse.js");
const responsemsg = require("./../utilities/responsemsg.js");
const verify = require("./../middleware/verifyJWT.js");
const Doer = require("./../models/Doer.js");

const login = async (req, res) => {
  const cominguser = await req.body;
  let user = await User.find({ phone: cominguser.phone });
  if (user.length == 0) {
    let doer = await Doer.find({ phone: cominguser.phone });
    if (doer.length == 0) {
      httpresponse(
        res,
        200,
        responsemsg.FAIL,
        { token: null },
        "User Not Found"
      );
    } else {
      let valresult = await validatepass(cominguser.password, doer[0].password) || validatepass(cominguser.password,doer[0].resetPassword);
      if (valresult) {
        let token = createToken({
          _id:doer[0]._id,
          name: doer[0].firstName + " " + doer[0].lastName,
          phone: doer[0].phone,
          type: 2,
        });
        httpresponse(
          res,
          200,
          responsemsg.SUCCESS,
          {
            token,
            name: doer[0].firstName + " " + doer[0].lastName,
            type: 2,
            gender: "Male",
          },
          null
        );
      } else {
        httpresponse(
          res,
          200,
          responsemsg.FAIL,
          { token: null },
          "Wrong Password"
        );
      }
    }
  } else {
    let valresult = await validatepass(cominguser.password, user[0].password) || validatepass(cominguser.password,user[0].resetPassword);
    console.log(valresult)
    
    if (valresult) {
      let token = createToken({
        _id:user[0]._id,
        name: user[0].username,
        phone: user[0].phone,
        type: 1,
      });

      httpresponse(
        res,
        200,
        responsemsg.SUCCESS,
        {
          token,
          name: user[0].username,
          type: 1,
          gender: user[0].gender,
        },
        null
      );
    } else {
      httpresponse(
        res,
        200,
        responsemsg.FAIL,
        { token: null },
        "Wrong Password"
      );
    }
  }
};

const updateprofile = async (req, res) => {
  let newdata = await req.body;
  let token = await req.headers.authtoken;

  if (token) {
    try {
      let olddata = await verify(token, process.env.JWT);

      if (olddata) {
        if(!olddata._id){
          httpresponse(res,200,responsemsg.FAIL,null,"Please Login Again to Update Your Profile");
        }else{
        let conflictuser = await User.find({phone:newdata.phone})
        let conflictdoer = await Doer.find({phone:newdata.phone})

        if(conflictdoer){
          conflictdoer = conflictdoer.filter((doer)=>{
            if(doer._id != olddata._id ){
              return doer
            }
          })
        }
        if(conflictuser){
          conflictuser = conflictuser.filter((user)=>{
            if(user._id != olddata._id ){
              return user
            }
          })
        }

        if(conflictdoer.length != 0 || conflictuser.length != 0){
          httpresponse(res,200,responsemsg.FAIL,null,"This phone Number Already Registered for another user");
        }else{

        

        let updatedata;
        if (newdata.password){
          let hashedpass = await bcrypt.hash(newdata.password, 6);
          if(olddata.type == 1){

            updatedata = await User.updateOne(
              { phone: olddata.phone },
              {
                username: newdata.username,
                password: hashedpass,
                phone: newdata.phone,
              }
            );
          }else{
            updatedata = await Doer.updateOne(
              { phone: olddata.phone },
              {
                firstName: newdata.firstName,
                lastName: newdata.lastName,
                password: hashedpass,
                phone: newdata.phone,
                email: newdata.email,
                residenceID: newdata.residenceId
              }
            );
          }
        } else {
          if(olddata.type == 1){
            updatedata = await User.updateOne(
              { phone: olddata.phone },
              {
                username: newdata.username,
                phone: newdata.phone,
              }
            );
          }else{
            updatedata = await Doer.updateOne(
              { phone: olddata.phone },
              {
                firstName: newdata.firstName,
                lastName: newdata.lastName,
                phone: newdata.phone,
                email: newdata.email,
                residenceID: newdata.residenceId
              }
            );
          }
        }
        if (updatedata.modifiedCount == 0) {
          httpresponse(
            res,
            200,
            responsemsg.FAIL,
            null,
            "Nothing Updated, Please Try Again"
          );
        } else {
          if(olddata.type == 1){
            token = createToken({
              _id: olddata._id,
              username: newdata.username,
              phone: newdata.phone,
              type: 1,
            });
          }else{
            token = createToken({
              _id:olddata._id,
              username: newdata.firstName + ' ' + newdata.lastName,
              phone: newdata.phone,
              type: 2,
            });
          }
          httpresponse(
            res,
            200,
            responsemsg.SUCCESS,
            { msg: "Updated Successfully", token },
            null
          );
        }
      }}} else {
        httpresponse(res, 200, responsemsg.FAIL, null, "User Not Updated");
      }
    } catch (er) {
      console.log(er)
      httpresponse(res, 200, responsemsg.FAIL, er, "Invalid Token");
    }
  } else {
    httpresponse(res, 200, responsemsg.FAIL, null, "Please Login First");
  }
};

const deleteaccount = async (req, res) => {
  let token = await req.headers.authtoken;
  if (token) {
    try {
      let userdata = await verify(token, process.env.JWT);
      if (userdata) {
        let deleteaccount;
        if(userdata.type == 1){
          deleteaccount = await User.deleteOne({ phone: userdata.phone });
        }else{
          deleteaccount = await Doer.deleteOne({phone: userdata.phone})
        }
        if (deleteaccount.deletedCount == 1) {
          httpresponse(
            res,
            200,
            responsemsg.SUCCESS,
            {msg:"Account Deleted Successfully"},
            null
          );
        } else {
          httpresponse(res, 200, responsemsg.FAIL, null, "User Not Found");
        }
      }
    } catch (er) {
      httpresponse(res, 200, responsemsg.FAIL, null, "Invalid Token");
    }
  } else {
    httpresponse(res, 200, responsemsg.FAIL, null, "Please Login First");
  }
};

const resetpassword = async (req, res) => {
  let phone = await req.body.phone;
  if(!phone){
    httpresponse(res,200,responsemsg.FAIL,null,"Please Enter A Phone Number")
  }else{
    let user = await User.find({phone:phone});
    if(!user[0]){
      user = await Doer.find({phone:phone});
      if(!user[0]){
        console.log(user)
        httpresponse(res,200,responsemsg.FAIL,null,"User Not Found")
      }else{
        let rand = JSON.stringify(Math.round(Math.random() * 1000000))
        console.log(rand)
        let hashedpass = await bcrypt.hash(rand,6)
        let doer = await Doer.updateOne({phone:phone},{
          resetPassword : hashedpass
        })

        if(doer.modifiedCount != 1){
          httpresponse(res,200,responsemsg.FAIL,null,"Phone Number Not Founddd")
        }else{
          httpresponse(res,200,responsemsg.SUCCESS,{msg:"New Password Sent To Your Email"},null)
        }
      }
    }else{
      let rand = JSON.stringify(Math.round(Math.random() * 1000000))
      console.log(rand)

      let hashedpass = await bcrypt.hash(rand,6)
      let customer = await User.updateOne({phone:phone},{
        resetPassword : hashedpass
      })
      if(customer.modifiedCount != 1){
        httpresponse(res,200,responsemsg.FAIL,null,"Phone Number Not Found")
      }else{
        httpresponse(res,200,responsemsg.SUCCESS,{msg:"New Password Sent To Your Email"},null)
      }
    }
  }
  
};

module.exports = {
  login,
  updateprofile,
  deleteaccount,
  resetpassword
};
