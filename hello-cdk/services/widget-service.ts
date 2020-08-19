import { Construct } from '@aws-cdk/core';
import { RestApi, LambdaIntegration } from "@aws-cdk/aws-apigateway";
import { Function, Runtime, Code } from "@aws-cdk/aws-lambda";
import { Bucket } from "@aws-cdk/aws-s3";

export class WidgetService extends Construct {

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // lambda
    const bucket = new Bucket(this, "WidgetStore");

    const handler = new Function(this, "WidgetHandler", {
      runtime: Runtime.NODEJS_10_X,
      code: Code.asset("resources/widget"), // from "resources/" directory
      handler: "widgets.main",              // widgets.js file
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    // was: handler.role
    bucket.grantReadWrite(handler);

    // api gateway
    const api = new RestApi(this, "widgets-api", {
      restApiName: "Widget Service",
      description: "This service serves widgets."
    });

    const getWidgetsIntegration = new LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    // GET /
    api.root.addMethod("GET", getWidgetsIntegration);
  }
}
