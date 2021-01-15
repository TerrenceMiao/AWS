'use strict';
console.log('Loading function');
const aws = require('aws-sdk');
const stepfunctions = new aws.StepFunctions();
const ses = new aws.SES();
exports.handler = (event, context, callback) =>
{

    var taskParams = {
        activityArn: process.env.ActivityArn
    };

    stepfunctions.getActivityTask(taskParams, function(err, data)
    {
        if (err)
        {
            console.log(err, err.stack);
            context.fail('An error occured while calling getActivityTask.');
        }
        else
        {
            if (data === null || data.input == undefined)
            {
                console.log('No activities received after 60 seconds.');
                // No activities scheduled
                context.succeed('No activities received after 60 seconds.');

            }
            else
            {

                var input = JSON.parse(data.input);

                var emailParams = {
                    Destination:
                    {
                        ToAddresses: [
                            input.email.emailAddress
                        ]
                    },
                    Message:
                    {
                        Subject:
                        {
                            Data: input.email.subject,
                            Charset: 'UTF-8'
                        },
                        Body:
                        {
                            Html:
                            {
                                Data: input.email.messageBody + '<br />' +
                                    'Your approval is required for this process!' +
                                    'Can you please approve:<br />' +
                                    process.env.SuccessURL + '?taskToken=' + encodeURIComponent(data.taskToken) + '<br /><br />' +
                                    'Or reject:<br />' +
                                    process.env.FailURL + '?taskToken=' + encodeURIComponent(data.taskToken),
                                Charset: 'UTF-8'
                            }
                        }
                    },
                    Source: input.email.emailAddress,
                    ReplyToAddresses: [
                        input.email.emailAddress
                    ]
                };

                ses.sendEmail(emailParams, function(err, data)
                {
                    if (err)
                    {
                        console.log(err, err.stack);
                        context.fail('Internal Error: The email could not be sent.');
                    }
                    else
                    {
                        console.log(data);
                        context.succeed('The email was successfully sent.');
                    }
                });
            }
        }

    });
};