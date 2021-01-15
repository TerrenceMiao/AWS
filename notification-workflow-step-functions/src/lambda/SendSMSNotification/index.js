'use strict';

const aws = require('aws-sdk');
const sns = new aws.SNS({apiVersion: '2010-03-31'});

exports.handler = (event, context, callback) =>
{
    console.log(JSON.stringify(event));

    // Create publish parameters
    var smsParams = {
        Message: event.sms.messageBody,
        PhoneNumber: event.sms.phoneNumber,
        MessageAttributes: {
           "AWS.SNS.SMS.SMSType" : {
              "DataType": "String",
              "StringValue": "Transactional"
           }
        }
    };

    console.log(JSON.stringify(smsParams));

    sns.publish(smsParams, function(err, data)
    {
        if (err)
        {
            console.log(err, err.stack);
            context.fail('Internal Error: The SMS could not be sent.');
        }
        else
        {
            console.log('The SMS was successfully sent.' + JSON.stringify(data));
            context.succeed('The SMS was successfully sent.');
        }
    });
};

