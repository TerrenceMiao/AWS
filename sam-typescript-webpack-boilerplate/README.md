# serverless-SAM-typscript-boilerplate

A boilerplate AWS SAM template using AWS Lambda and Layers, Typescript and Webpack.

Just prove that `Webpack` should NOT be used in package management in AWS Lambda solution. Use `serverless`, or `AWS CDK` and `AWS SAM` instead.

- Run `npm install` and `npm run build:prod` under **apis/helloworld/functions/greeting** directory
- Run `npm install` and `npm run build:prod` under **apis/helloworld/layers/api-responses** directory
- Run `sam build` under **apis/helloworld** directory


## References

- Creating an AWS SAM CLI project with Typescript and Both Types of Layers (Dependencies and Function), _https://levelup.gitconnected.com/creating-an-aws-sam-cli-project-with-typescript-and-both-types-of-layers-dependencies-and-34da5efdaec8_