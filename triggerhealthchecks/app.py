import json
import os
import boto3
import validators


import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# TODO: initialise SNS and DynamoDB clients here

sns_client = boto3.client("sns")
SNS_TOPIC = os.getenv("SNS_TOPIC")


def validate_url(url):
    validators.url(url)


def send_healthcheck_sns(site: str):
    # TODO: use boto3 to send an SNS message
    # TODO: send url in the SNS

    message_data = {
        "site": site
    }

    print(f"message_data: {message_data}")
    print(f"SNS Topic: {SNS_TOPIC}")

    # sns_client.publish(
    #     TopicArn="",
    #     Message=json.dumps(message_data)
    # )

    pass


def dispatch(event, context):

    logger.info(event)

    # TODO: validate CAPTCHA

    query_string: dict = event.get("queryStringParameters")

    if not query_string:
        raise Exception("No query string provided")

    site: str | None = query_string.get("site")

    if not site:
        raise Exception("No Website Provided")

    validate_url(url=site)

    send_healthcheck_sns(site)


def lambda_handler(event, context):
    try:
        dispatch(event, context)
        return {"statusCode": 200, "body": json.dumps("health check")}

    except Exception as e:
        logger.info(e)
        return {
            "statusCode": 500,
            "body": json.dumps(
                {"message": "error: Unable to trigger health Checks"}
            )
        }
