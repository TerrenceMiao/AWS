'use strict';

exports.handler = (event, context, callback) =>
{
    if (event.email != undefined && event.email.emailAddress != undefined)
        event.isEmail = true;
    else
        event.isEmail = false;
    if (event.sms != undefined && event.sms.phoneNumber != undefined)
        event.isSMS = true;
    else
        event.isSMS = false;
    if (event.slack != undefined && event.slack.webhook != undefined)
        event.isSlack = true;
    else
        event.isSlack = false;
        
   context.done(null, event);
};
