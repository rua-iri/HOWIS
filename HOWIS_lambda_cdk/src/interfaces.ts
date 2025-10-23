interface lambdaEvent {
  body: string;
  resource: string;
  path: string;
  httpMethod: string;
  isBase64Encoded: boolean;
  queryStringParameters: {
    site?: string;
  };
  pathParameters: object;
  stageVariables: object;
  headers: object;
  requestContext: {
    accountId: string;
    resourceId: string;
    stage: string;
    requestId: string;
    requestTime: string;
    requestTimeEpoch: number;
    identity: {
      cognitoIdentityPoolId: null;
      accountId: null;
      cognitoIdentityId: null;
      caller: null;
      accessKey: null;
      sourceIp: string;
      cognitoAuthenticationType: null;
      cognitoAuthenticationProvider: null;
      userArn: null;
      userAgent: string;
      user: null;
    };
    path: string;
    resourcePath: string;
    httpMethod: string;
    apiId: string;
    protocol: string;
  };
}

interface lambdaResponse {
  body: string;
  statusCode: number;
}

export { lambdaEvent, lambdaResponse };
