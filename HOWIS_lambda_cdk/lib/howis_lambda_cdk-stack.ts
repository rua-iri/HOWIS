import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as apiGW from "aws-cdk-lib/aws-apigateway";
import * as path from "node:path";

export class HowisLambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloFunction = new lambdaNode.NodejsFunction(this, "MyFunction", {
      entry: path.join(__dirname, "../src/HelloFunction/index.ts"),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
    });

    new apiGW.LambdaRestApi(this, "ApiGwEndpoint", {
      handler: helloFunction,
      restApiName: "HelloApi",
    });
  }
}
