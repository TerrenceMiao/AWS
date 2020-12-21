'use strict';

const AWS = require('aws-sdk')

module.exports.proxy = (event, context, callback) => {

  var params = {
    stateMachineArn: process.env.state_machine_arn,
    input: JSON.stringify({})
  }

  var stepFunctions = new AWS.StepFunctions()

  stepFunctions.startExecution(params, (err, data) => {
    if (err) {
      console.log('err while executing step function');
    } else {
      console.log('started execution of step function');
    }
  })
}


module.exports.helloWorld = (event, context, callback) => {

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world!'
    }),
  };

  callback(null, response);
};

module.exports.ciaoWorld = (event, context, callback) => {

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'ciao world!'
    }),
  };

  callback(null, response);
};