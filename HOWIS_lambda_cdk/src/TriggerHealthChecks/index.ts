import { lambdaEvent, lambdaResponse } from "../interfaces";

const dispatch = async (event: lambdaEvent): Promise<lambdaResponse> => {
  const { resource, path, httpMethod, headers, queryStringParameters, body } =
    event;

  if (!queryStringParameters) {
    throw new Error("No Query String Parameters Provided");
  }

  const siteURL = queryStringParameters.site;

  if (!siteURL) {
    throw new Error("No Site URL Provided");
  }

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

export const handler = async (event: lambdaEvent): Promise<lambdaResponse> => {
  try {
    return await dispatch(event);
  } catch (error) {
    return {
      body: JSON.stringify({ error: "Internal Server Error" }),
      statusCode: 500,
    };
  }
};
