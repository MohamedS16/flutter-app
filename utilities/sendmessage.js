const accountSid = 'ACc9d33dc59f354c5a1fa5f4f09cb1a3de';
const authToken = '49249976875a6ff8434efc541e9177b7';
const client = require('twilio')(accountSid, authToken);

const sendmsg = ()=>{
    client.messages.create({
        body: 'Test Twillo',
        from: '+13236883584',
        to: '+00966571107803'
    })
    .then(message => console.log(message.sid))
    .catch(err=>console.log(err))
}

module.exports = sendmsg