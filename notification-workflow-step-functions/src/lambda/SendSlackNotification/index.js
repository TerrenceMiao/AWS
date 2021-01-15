'use strict';
const url = require('url');
const https = require('https');

exports.handler = (event, context, callback) =>
{
    const body = JSON.stringify(event.slack.messageBody);
    const options = url.parse(event.slack.webhook);
    options.method = 'POST';
    options.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
    };

    console.log(JSON.stringify(options));

    const postReq = https.request(options, (res) =>
    {
        const chunks = [];
        res.setEncoding('utf8');
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () =>
        {
            console.log(res.statusCode);

            if (res.statusCode == 200)
            {
                console.log('Message to Slack channel was successfully sent.' );
                context.succeed('Message to Slack channel was successfully sent.');
            }
        });
        return res;
    });

    postReq.write(body);
    postReq.end();
}