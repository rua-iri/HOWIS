import json
import boto3


def invoke_healthcheck_lambda(region_name: str, function_name: str):
    lambda_client = boto3.client('lambda', region_name=region_name)

    # TODO: use boto3 to call the different lambda functions in different regions

    # TODO: send url in lambda's invoke payload

    lambda_client.invoke(FunctionName=function_name)


def dispatch(event, context):

    regions = [
        "us-west-2",
        "us-east-1",
        "eu-west-1",
        "ap-southeast-1",
        "ap-northeast-1"
    ]

    for region in regions:
        function_name: str = "healthcheck-{region}".formatformat(region=region)
        invoke_healthcheck_lambda(
            region_name=region,
            function_name=function_name
        )


def lambda_handler(event, context):

    return {"statusCode": 200, "body": json.dumps("health check")}
