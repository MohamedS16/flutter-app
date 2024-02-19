const accountSid = 'ACc9d33dc59f354c5a1fa5f4f09cb1a3de';
const authToken = '7ee32997a536051a0b9b004bfda39dc0';
const client = require('twilio')(accountSid, authToken);

let sendmsg = ()=>{

    client.messages
        .create({
            body: 'Islam Test',
            from: '+13236883584',
            to: '+201124449731'
        })
        .then(message => console.log(message.sid))
        .catch(er=>console.log(er));
}

module.exports = sendmsg

