const httpresponse = (res,statuscode,statustext,data,error)=>{
    res.status(statuscode).json({
        status : statustext,
        data : data,
        error
    })
}



module.exports = {
    httpresponse,
}