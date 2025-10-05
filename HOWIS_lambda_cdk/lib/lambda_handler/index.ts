import * as lambda from "aws-cdk-lib/aws-lambda";
import { lambdaEvent, lambdaResponse } from "./interfaces";

export const handler = async (event: lambdaEvent): Promise<lambdaResponse> => {
  const { resource, path, httpMethod, headers, queryStringParameters, body } =
    event;

  const response = {
    resource,
    path,
    httpMethod,
    headers,
    queryStringParameters,
    body,
  };

  return {
    body: JSON.stringify(response, null, 2),
    statusCode: 200,
  };
};
