import json
import os
import traceback
import boto3
import requests
from site_url import SiteURL

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

dynamo_client = boto3.client("dynamodb")
DYNAMO_TABLE = os.getenv("DYNAMO_TABLE")


def update_dynamo_item(
        item_id: str,
        success_count: int,
        fail_count: int
):

    key = {
        "id": {
            "S": item_id
        }
    }
    expression_values = {
        ":sc": {
            "N": str(success_count)
        },
        ":fc": {
            "N": str(fail_count)
        },
        ":incre": {
            "N": "1"
        }
    }

    update_expression = """SET success_count = success_count + :sc,
    fail_count = fail_count + :fc,
    request_count = request_count + :incre
    """

    dynamo_client.update_item(
        TableName=DYNAMO_TABLE,
        Key=key,
        UpdateExpression=update_expression,
        ExpressionAttributeValues=expression_values
    )


def check_site_status(site: SiteURL) -> tuple:
    count_success = 0
    count_fail = 0

    for i in range(3):
        logger.info(f"Ping: {i}")
        try:
            requests.head(site.get_https())
            count_success += 1
        except requests.ConnectionError:
            count_fail += 1

    return count_success, count_fail


def dispatch(event, context):
    logger.info(event)

    message = event.get("Records")[0].get("Sns").get("Message")
    message = json.loads(message)

    site: str = message.get("site")
    item_id = message.get("item_id")

    if not site or not item_id:
        raise Exception("No Website or Item ID Provided")

    site: SiteURL = SiteURL(site)
    logger.info(f"Site: {site.get_https()}")
    count_success, count_fail = check_site_status(site)

    logger.info(f"Success Count: {count_success}")
    logger.info(f"Fail Count: {count_fail}")

    update_dynamo_item(item_id, count_success, count_fail)

    return {"statusCode": 200,
            "headers": {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            "body": json.dumps({
                "count_success": count_success,
                "count_fail": count_fail
            })}


def lambda_handler(event, context):
    try:
        return dispatch(event, context)

    except Exception as e:
        logger.error(e)
        logger.error(traceback.format_exc())
        return {
            "statusCode": 500,
            "headers": {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            "body": json.dumps(
                {"error": "An error occurred"}
            )
        }
