# sam-lambda-step-functions

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders:

- functions - Code for the application's Lambda functions to check the value of, buy, or sell shares of a stock.
- statemachines - Definition for the state machine that orchestrates the stock trading workflow.
- template.yaml - A template that defines the application's AWS resources.

This application creates a mock stock trading workflow which runs on a pre-defined schedule (note that the schedule is disabled by default to avoid incurring charges). It demonstrates the power of Step Functions to orchestrate Lambda functions and other AWS resources to form complex and robust workflows, coupled with event-driven development using Amazon EventBridge.

AWS Step Functions lets you coordinate multiple AWS services into serverless workflows so you can build and update apps quickly. Using Step Functions, you can design and run workflows that stitch together services, such as AWS Lambda, AWS Fargate, and Amazon SageMaker, into feature-rich applications.

The application uses several AWS resources, including Step Functions state machines, Lambda functions and an EventBridge rule trigger. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

If you prefer to use an integrated development environment (IDE) to build and test the Lambda functions within your application, you can use the AWS Toolkit. The AWS Toolkit is an open source plug-in for popular IDEs that uses the SAM CLI to build and deploy serverless applications on AWS. The AWS Toolkit also adds a simplified step-through debugging experience for Lambda function code. See the following links to get started:

* [PyCharm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [IntelliJ](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html)
* [Visual Studio](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/welcome.html)

The AWS Toolkit for VS Code includes full support for state machine visualization, enabling you to visualize your state machine in real time as you build. The AWS Toolkit for VS Code includes a language server for Amazon States Language, which lints your state machine definition to highlight common errors, provides auto-complete support, and code snippets for each state, enabling you to build state machines faster.

## Deploy the sample application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda.

To use the SAM CLI, you need the following tools:

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 12](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
𝜆 sam build
𝜆 sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modified IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your State Machine ARN in the output values displayed after deployment.

## Use the SAM CLI to build and test locally

Build the Lambda functions in your application with the `sam build --use-container` command.

```bash
𝜆 sam build
Building codeuri: functions/stock-checker/ runtime: nodejs12.x metadata: {} functions: ['StockCheckerFunction']
Running NodejsNpmBuilder:NpmPack
Running NodejsNpmBuilder:CopyNpmrc
Running NodejsNpmBuilder:CopySource
Running NodejsNpmBuilder:NpmInstall
Running NodejsNpmBuilder:CleanUpNpmrc
Building codeuri: functions/stock-seller/ runtime: nodejs12.x metadata: {} functions: ['StockSellerFunction']
Running NodejsNpmBuilder:NpmPack
Running NodejsNpmBuilder:CopyNpmrc
Running NodejsNpmBuilder:CopySource
Running NodejsNpmBuilder:NpmInstall
Running NodejsNpmBuilder:CleanUpNpmrc
Building codeuri: functions/stock-buyer/ runtime: nodejs12.x metadata: {} functions: ['StockBuyerFunction']
Running NodejsNpmBuilder:NpmPack
Running NodejsNpmBuilder:CopyNpmrc
Running NodejsNpmBuilder:CopySource
Running NodejsNpmBuilder:NpmInstall
Running NodejsNpmBuilder:CleanUpNpmrc

Build Succeeded

Built Artifacts  : .aws-sam/build
Built Template   : .aws-sam/build/template.yaml

Commands you can use next
=========================
[*] Invoke Function: sam local invoke
[*] Deploy: sam deploy --guided
```

The SAM CLI installs dependencies defined in `functions/*/package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

## Add a resource to your application
The application template uses AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources such as functions, triggers, and APIs. For resources not included in [the SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use standard [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) resource types.

## Use the SAM CLI to deploy

Deploy to AWS cloud.

```bash
𝜆 sam deploy --guided

Configuring SAM deploy
======================

	Looking for config file [samconfig.toml] :  Not found

	Setting default arguments for 'sam deploy'
	=========================================
	Stack Name [sam-app]: stock-trading-example
	AWS Region [us-east-1]: ap-southeast-2
	#Shows you resources changes to be deployed and require a 'Y' to initiate deploy
	Confirm changes before deploy [y/N]: Y
	#SAM needs permission to be able to create roles to connect to the resources in your template
	Allow SAM CLI IAM role creation [Y/n]:
	Save arguments to configuration file [Y/n]:
	SAM configuration file [samconfig.toml]:
	SAM configuration environment [default]:

	Looking for resources needed for deployment: Found!

		Managed S3 bucket: aws-sam-cli-managed-default-samclisourcebucket-1qfxu9y982ao
		A different default S3 bucket can be set in samconfig.toml

	Saved arguments to config file
	Running 'sam deploy' for future deployments will use the parameters saved above.
	The above parameters can be changed by modifying samconfig.toml
	Learn more about samconfig.toml syntax at
	https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html

Uploading to stock-trading-example/45bd9a8dff25082b8f6d078abb1b3581  2839 / 2839.0  (100.00%)
Uploading to stock-trading-example/e230f830ea421fc0678e2c109b976769  776 / 776.0  (100.00%)
Uploading to stock-trading-example/eafb6251f887c4d75835ab87633d8e93  1056 / 1056.0  (100.00%)
Uploading to stock-trading-example/6ed3a404d1c3440b63bd4723eaef7120  1056 / 1056.0  (100.00%)

	Deploying with following values
	===============================
	Stack name                   : stock-trading-example
	Region                       : ap-southeast-2
	Confirm changeset            : True
	Deployment s3 bucket         : aws-sam-cli-managed-default-samclisourcebucket-1qfxu9y982ao
	Capabilities                 : ["CAPABILITY_IAM"]
	Parameter overrides          : {}
	Signing Profiles             : {}

Initiating deployment
=====================
Uploading to stock-trading-example/e7bf04fd9d13ec8e17b44cf141ab37eb.template  2894 / 2894.0  (100.00%)

Waiting for changeset to be created..

CloudFormation stack changeset
------------------------------------------------------------------------------------------------------------
Operation  LogicalResourceId                                  ResourceType                       Replacement
------------------------------------------------------------------------------------------------------------
+ Add      StockBuyerFunctionRole                             AWS::IAM::Role                     N/A
+ Add      StockBuyerFunction                                 AWS::Lambda::Function              N/A
+ Add      StockCheckerFunctionRole                           AWS::IAM::Role                     N/A
+ Add      StockCheckerFunction                               AWS::Lambda::Function              N/A
+ Add      StockSellerFunctionRole                            AWS::IAM::Role                     N/A
+ Add      StockSellerFunction                                AWS::Lambda::Function              N/A
+ Add      StockTradingStateMachineHourlyTradingScheduleRole  AWS::IAM::Role                     N/A
+ Add      StockTradingStateMachineHourlyTradingSchedule      AWS::Events::Rule                  N/A
+ Add      StockTradingStateMachineRole                       AWS::IAM::Role                     N/A
+ Add      StockTradingStateMachine                           AWS::StepFunctions::StateMachine   N/A
+ Add      TransactionTable                                   AWS::DynamoDB::Table               N/A
------------------------------------------------------------------------------------------------------------

Changeset created successfully. arn:aws:cloudformation:ap-southeast-2:755034721059:changeSet/samcli-deploy1609938097/5fce5885-ab8e-4961-8803-4c4dd8ffdc50


Previewing CloudFormation changeset before deployment
======================================================
Deploy this changeset? [y/N]: Y

2021-01-07 00:02:02 - Waiting for stack create/update to complete

CloudFormation events from changeset
------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus      ResourceType                      LogicalResourceId                                  ResourceStatusReason
------------------------------------------------------------------------------------------------------------------------------------
CREATE_IN_PROGRESS  AWS::DynamoDB::Table              TransactionTable                                   Resource creation Initiated
CREATE_IN_PROGRESS  AWS::IAM::Role                    StockSellerFunctionRole                            -
CREATE_IN_PROGRESS  AWS::DynamoDB::Table              TransactionTable                                   -
CREATE_IN_PROGRESS  AWS::IAM::Role                    StockCheckerFunctionRole                           -
CREATE_IN_PROGRESS  AWS::IAM::Role                    StockBuyerFunctionRole                             -
CREATE_IN_PROGRESS  AWS::IAM::Role                    StockSellerFunctionRole                            Resource creation Initiated
CREATE_IN_PROGRESS  AWS::IAM::Role                    StockCheckerFunctionRole                           Resource creation Initiated
CREATE_IN_PROGRESS  AWS::IAM::Role                    StockBuyerFunctionRole                             Resource creation Initiated
CREATE_COMPLETE     AWS::IAM::Role                    StockBuyerFunctionRole                             -
CREATE_COMPLETE     AWS::IAM::Role                    StockSellerFunctionRole                            -
CREATE_COMPLETE     AWS::IAM::Role                    StockCheckerFunctionRole                           -
CREATE_IN_PROGRESS  AWS::Lambda::Function             StockBuyerFunction                                 -
CREATE_IN_PROGRESS  AWS::Lambda::Function             StockBuyerFunction                                 Resource creation Initiated
CREATE_IN_PROGRESS  AWS::Lambda::Function             StockSellerFunction                                Resource creation Initiated
CREATE_IN_PROGRESS  AWS::Lambda::Function             StockCheckerFunction                               Resource creation Initiated
CREATE_IN_PROGRESS  AWS::Lambda::Function             StockSellerFunction                                -
CREATE_IN_PROGRESS  AWS::Lambda::Function             StockCheckerFunction                               -
CREATE_COMPLETE     AWS::Lambda::Function             StockBuyerFunction                                 -
CREATE_COMPLETE     AWS::Lambda::Function             StockSellerFunction                                -
CREATE_COMPLETE     AWS::Lambda::Function             StockCheckerFunction                               -
CREATE_COMPLETE     AWS::DynamoDB::Table              TransactionTable                                   -
CREATE_IN_PROGRESS  AWS::IAM::Role                    StockTradingStateMachineRole                       Resource creation Initiated
CREATE_IN_PROGRESS  AWS::IAM::Role                    StockTradingStateMachineRole                       -
CREATE_COMPLETE     AWS::IAM::Role                    StockTradingStateMachineRole                       -
CREATE_IN_PROGRESS  AWS::StepFunctions::StateMachine  StockTradingStateMachine                           -
CREATE_IN_PROGRESS  AWS::StepFunctions::StateMachine  StockTradingStateMachine                           Resource creation Initiated
CREATE_COMPLETE     AWS::StepFunctions::StateMachine  StockTradingStateMachine                           -
CREATE_IN_PROGRESS  AWS::IAM::Role                    StockTradingStateMachineHourlyTradingScheduleRole  -
CREATE_IN_PROGRESS  AWS::IAM::Role                    StockTradingStateMachineHourlyTradingScheduleRole  Resource creation Initiated
CREATE_COMPLETE     AWS::IAM::Role                    StockTradingStateMachineHourlyTradingScheduleRole  -
CREATE_IN_PROGRESS  AWS::Events::Rule                 StockTradingStateMachineHourlyTradingSchedule      -
CREATE_IN_PROGRESS  AWS::Events::Rule                 StockTradingStateMachineHourlyTradingSchedule      Resource creation Initiated
CREATE_COMPLETE     AWS::Events::Rule                 StockTradingStateMachineHourlyTradingSchedule      -
CREATE_COMPLETE     AWS::CloudFormation::Stack        stock-trading-example                              -
------------------------------------------------------------------------------------------------------------------------------------

CloudFormation outputs from deployed stack
-------------------------------------------------------------------------------------------------------------------
Outputs
-------------------------------------------------------------------------------------------------------------------
Key                 StockTradingStateMachineArn
Description         Stock Trading state machine ARN
Value               arn:aws:states:ap-southeast-2:755034721059:stateMachine:StockTradingStateMachine-O2WHhrwtOckF

Key                 StockTradingStateMachineRole
Description         IAM Role created for Stock Trading state machine based on the specified SAM Policy Templates
Value               arn:aws:iam::755034721059:role/stock-trading-example-StockTradingStateMachineRole-JCFDWTPY1CGR
------------------------------------------------------------------------------------------------------------------

Successfully created/updated stack - stock-trading-example in ap-southeast-2
```

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
𝜆 sam logs -n StockCheckerFunction --stack-name stock-trading-example --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `functions/*/tests` folder in this project. Use NPM to install the [Mocha test framework](https://mochajs.org/) and run unit tests.

```bash
𝜆 cd functions/stock-checker
𝜆 npm install
𝜆 npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
𝜆 aws cloudformation delete-stack --stack-name stock-trading-example
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
