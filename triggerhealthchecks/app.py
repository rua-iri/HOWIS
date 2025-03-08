import json
import boto3
import validators


import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def validate_url(url):
    validators.url(url)


def invoke_healthcheck_lambda(region_name: str, function_name: str):
    # TODO: use boto3 to send an SNS message
    # TODO: send url in the SNS 

    pass


def dispatch(event, context):

    query_string: dict = event.get("queryStringParameters")

    if not query_string:
        raise Exception("No query string provided")

    site: str | None = query_string.get("site")

    if not site:
        raise Exception("No Website Provided")
    
    validate_url(url=site)

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
    try:
        dispatch()
        return {"statusCode": 200, "body": json.dumps("health check")}
    
    except Exception as e:
        logger.info(e)
        return {"statusCode": 500, "body": json.dumps("health check failed")}
