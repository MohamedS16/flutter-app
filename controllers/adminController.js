const { httpresponse } = require("./../utilities/httpResponse.js");
const responsemsg = require("./../utilities/responsemsg.js");
const Doer = require("../models/Doer.js");
const Request = require("./../models/Request.js");
const User = require("./../models/User.js");
const Admin = require("../models/Admin.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const validatepass = require("./../middleware/validatepassword.js");
const createToken = require("./../utilities/createJWT.js");
const verifyToken = require("./../middleware/verifyJWT.js");

const getalldoers = async (req, res) => {
  let doers = await Doer.find();
  httpresponse(res, 200, responsemsg.SUCCESS, doers, null);
};

const getallcustomers = async (req, res) => {
  let customers = await User.find();
  httpresponse(res, 200, responsemsg.SUCCESS, customers, null);
};

const getdoersrequests = async (req, res) => {
  let doerid = await req.params.phone;
  let doerrequest = await Request.find({ doer: doerid });
  httpresponse(res, 200, responsemsg.SUCCESS, doerrequest, null);
};

const getcustomerequests = async (req, res) => {
  let customerid = await req.params.phone;
  let customerrequest = await Request.find({ customer: customerid });
  httpresponse(res, 200, responsemsg.SUCCESS, customerrequest, null);
};

const getsinglerequest = async (req, res) => {
  let requestid = await req.params.doerid;
  let request = await Request.find({ _id: requestid });
  httpresponse(res, 200, responsemsg.SUCCESS, request, null);
};

const approvevideo = async (req, res) => {
  let videodata = await req.body;
  if (!videodata.requestID || !videodata.step || !videodata.action) {
    httpresponse(
      res,
      200,
      responsemsg.FAIL,
      null,
      "Please Choose A Video To Approve or Reject"
    );
  } else {
    let stepp = `videos.${videodata.step}.approved`;
    let updatevideo;
    if (videodata.step == "one") {
      updatevideo = await Request.updateOne(
        { _id: videodata.requestID },
        {
          "videos.one.approved": videodata.action,
        }
      );
    } else if (videodata.step == "two") {
      updatevideo = await Request.updateOne(
        { _id: videodata.requestID },
        {
          "videos.two.approved": videodata.action,
        }
      );
    } else if (videodata.step == "three") {
      updatevideo = await Request.updateOne(
        { _id: videodata.requestID },
        {
          "videos.three.approved": videodata.action,
        }
      );
    } else if (videodata.step == "four") {
      updatevideo = await Request.updateOne(
        { _id: videodata.requestID },
        {
          "videos.four.approved": videodata.action,
        }
      );
    } else {
      httpresponse(
        res,
        200,
        responsemsg.FAIL,
        null,
        "Please Enter a valid Step"
      );
    }

    if (updatevideo?.modifiedCount == 0) {
      httpresponse(
        res,
        200,
        responsemsg.FAIL,
        null,
        "Nothing Updated Please Try Again"
      );
    } else {
      httpresponse(
        res,
        200,
        responsemsg.SUCCESS,
        { msg: "Updated Successfully", updatevideo },
        null
      );
    }
  }
};

const adminRegister = async (req, res) => {
  try {
    let valresult = validationResult(req);
    if (valresult.array().length != 0) {
      let errors = valresult.array().map((element) => {
        return element.msg;
      });
      httpresponse(res, 200, responsemsg.FAIL, null, errors);
    } else {
      let admindata = await req.body;
      let hashedpassword = await bcrypt.hash(admindata.adminPassword, 6);
      let registeration = await new Admin({
        adminName: admindata.adminName,
        adminPassword: hashedpassword,
      });
      let done = await registeration.save();
      console.log(done);
      if (!done) {
        httpresponse(
          res,
          200,
          responsemsg.FAIL,
          null,
          "Something Went Wrong, Please Try Again"
        );
      } else {
        httpresponse(
          res,
          200,
          responsemsg.SUCCESS,
          { msg: "Registered Successfully" },
          null
        );
      }
    }
  } catch (er) {
    console.log(er);
  }
};

const adminLogin = async (req, res) => {
  const cominguser = await req.body;
  let admin = await Admin.find({ adminName: cominguser.adminName });
  if (admin.length == 0) {
    httpresponse(
      res,
      200,
      responsemsg.FAIL,
      { token: null },
      "Admin Not Found"
    );
  } else {
    let valresult = await validatepass(
      cominguser.adminPassword,
      admin[0].adminPassword
    );
    if (valresult) {
      let token = createToken({
        _id: admin[0]._id,
        adminName: admin[0].adminName,
      });
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: false,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      httpresponse(
        res,
        200,
        responsemsg.SUCCESS,
        {adminName: admin[0].adminName },
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

const getAdmin = async (req, res) => {
  let token = await req.cookies["jwt"];
  if (!token) {
    httpresponse(res, 401, responsemsg.FAIL, null, "Unauthorized - getadmin");
  } else {
    let verifytoken = await verifyToken(token);
    res.json(verifytoken);
  }
};

const adminLogout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json({ msg: "Logged Out" });
};

const assignRequest = async (req, res) => {
  let request = req.body;
  let upd = await Request.updateOne(
    { _id: request.rid },
    {
      doer: request.doer,
    }
  );

  if (upd.modifiedCount != 1) {
    httpresponse(
      res,
      200,
      responsemsg.FAIL,
      null,
      "Nothing Updated, Please Try Again"
    );
  } else {
    let inc = await Doer.updateOne(
      { phone: request.doer },
      {
        $inc: { requests: 1 },
      }
    );

    httpresponse(res, 200, responsemsg.SUCCESS, "Updated Successfully", null);
  }
};

const allAggregations = async (req, res) => {
  try {
    let totalRequests = await Request.estimatedDocumentCount();
    let requestsCases = await Request.aggregate([
      {$group : {
        _id: '$case',
        count: {$count: {}}
      }}
    ]);
    let requestsTypes = await Request.aggregate([
      {
        $group: {
          _id: '$type',
          count: {$count: {}}
        }
      }
    ]);
    let requestPayment = await Request.countDocuments({payment: {$ne: "none"}})
    let requestsAggregations = {
      totalRequests,
      requestsCases,
      requestsTypes,
      requestPayment
    }


    let totalUsers = await User.estimatedDocumentCount()
    let usersGender = await User.aggregate([
      {
        $group : {
          _id : "$gender",
          count : {$count : {}}
        }
      }
    ])
    let usersCountry = await User.aggregate([
      {
        $group : {
          _id : "$country",
          count: {$count: {}}
        }
      }
    ])
    let usersDevice = await User.aggregate([
      {
        $group : {
          _id : "$device",
          count: {$count: {}}
        }
      }
    ])
    let topThreeUsers = await User.find({requests: {$gt : 0}},'username rId phone requests').sort({requests: -1}).limit(3)

    let usersAggregations = {
      totalUsers,
      usersGender,
      usersCountry,
      usersDevice,
      topThreeUsers
    }
 

    let totalDoers = await Doer.estimatedDocumentCount()
    let topThreeDoers = await Doer.find({requests: {$gt:0}},'dId firstName phone requests').sort({requests: -1}).limit(3)

    let doersAggregations = {
      totalDoers,
      topThreeDoers
    }

    httpresponse(res, 200, responsemsg.SUCCESS, { requestsAggregations,usersAggregations,doersAggregations }, null);
  
  } catch (er) {
    console.log(er)
    httpresponse(
      res,
      403,
      responsemsg.SUCCESS,
      null,
      {msg:"Something Went Wrong, Please Try Again Later",er}
    );
  }
};

module.exports = {
  getallcustomers,
  getalldoers,
  getdoersrequests,
  getcustomerequests,
  getsinglerequest,
  approvevideo,
  adminRegister,
  adminLogin,
  getAdmin,
  adminLogout,
  assignRequest,
  allAggregations
};
