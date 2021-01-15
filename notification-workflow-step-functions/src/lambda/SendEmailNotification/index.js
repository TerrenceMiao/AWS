'use strict';

const aws = require('aws-sdk');
const ses = new aws.SES();

exports.handler = (event, context, callback) => 
{
   console.log(JSON.stringify(event));
    var emailParams = {
        Destination:
        {
            ToAddresses: [
                event.email.emailAddress
            ]
        },
        Message:
        {
            Subject:
            {
                Data: event.email.subject,
                Charset: 'UTF-8'
            },
            Body:
            {
                Html:
                {
                    Data: event.email.messageBody,
                    Charset: 'UTF-8'
                }
            }
        },
        Source: event.email.emailAddress,
        ReplyToAddresses: [
            event.email.emailAddress
        ]
    };
   console.log(JSON.stringify(emailParams));
    ses.sendEmail(emailParams, function(err, data)
    {
        if (err)
        {
            console.log(err, err.stack);
            context.fail('Internal Error: The email could not be sent.');
        }
        else
        {
            console.log('The email was successfully sent.'+data);
            context.succeed('The email was successfully sent.');
        }
    });
};
