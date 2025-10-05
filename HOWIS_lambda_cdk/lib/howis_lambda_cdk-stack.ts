import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGW from "aws-cdk-lib/aws-apigateway";
import * as path from "node:path";

export class HowisLambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloFunction = new lambda.Function(this, "MyFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "lambda_handler")),
    });

    const apiEndpoint = new apiGW.LambdaRestApi(this, "ApiGwEndpoint", {
      handler: helloFunction,
      restApiName: "HelloApi",
    });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'HowisLambdaCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
