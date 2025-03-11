import json
import os
import traceback
import boto3
import validators
from uuid import uuid4
from datetime import datetime


import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

sns_client = boto3.client("sns")
SNS_TOPIC = os.getenv("SNS_TOPIC")

dynamo_client = boto3.client("dynamodb")
DYNAMO_TABLE = os.getenv("DYNAMO_TABLE")


def validate_url(url):
    validators.url(url)


def put_dynamo_item(site: str) -> str:
    item_id: str = str(uuid4())
    timestamp: str = str(datetime.now())

    item = {
        "id": {
            "S": item_id
        },
        "timestamp": {
            "S": timestamp
        },
        "site_url": {
            "S": site
        },
        "fail_count": {
            "N": "0"
        },
        "success_count": {
            "N": "0"
        },
        "request_count": {
            "N": "0"
        }
    }

    dynamo_response = dynamo_client.put_item(
        TableName=DYNAMO_TABLE,
        Item=item
    )

    logger.info(dynamo_response)

    return item_id


def send_healthcheck_sns(site: str, item_id: str):

    message_data = {
        "site": site,
        "item_id": item_id
    }

    print(f"message_data: {message_data}")
    print(f"SNS Topic: {SNS_TOPIC}")
    print(f"Item ID: {item_id}")

    sns_client.publish(
        TopicArn=SNS_TOPIC,
        Message=json.dumps(message_data)
    )


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

    item_id: str = put_dynamo_item(site)

    send_healthcheck_sns(site, item_id)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "status": "success",
            "id": item_id
        })
    }


def lambda_handler(event, context):
    try:
        return dispatch(event, context)

    except Exception as e:
        logger.info(e)
        logger.info(traceback.format_exc())
        return {
            "statusCode": 500,
            "body": json.dumps(
                {"message": "error: Unable to trigger health checks"}
            )
        }
