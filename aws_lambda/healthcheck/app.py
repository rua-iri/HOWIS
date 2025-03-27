import json
import os
import traceback
import boto3
import requests
from site_url import SiteURL
from site_status import Site_Status

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

dynamo_client = boto3.client("dynamodb")
DYNAMO_TABLE = os.getenv("DYNAMO_TABLE")


def update_dynamo_item(
        item_id: str,
        site_status: Site_Status
):

    key = {
        "id": {
            "S": item_id
        }
    }
    expression_values = {
        ":sc": {
            "N": str(site_status.count_success)
        },
        ":fc": {
            "N": str(site_status.count_fail)
        },
        ":okc": {
            "N": str(site_status.count_ok)
        },
        ":cec": {
            "N": str(site_status.count_client_error)
        },
        ":sec": {
            "N": str(site_status.count_server_error)
        },
        ":incre": {
            "N": "1"
        }
    }

    update_expression = """SET success_count = success_count + :sc,
    fail_count = fail_count + :fc,
    ok_count = ok_count + :okc,
    client_error_count = client_error_count + :cec,
    server_error_count = server_error_count + :sec,
    request_count = request_count + :incre
    """

    dynamo_client.update_item(
        TableName=DYNAMO_TABLE,
        Key=key,
        UpdateExpression=update_expression,
        ExpressionAttributeValues=expression_values
    )


def check_site_status(site: SiteURL) -> Site_Status:
    site_status = Site_Status()

    for i in range(3):
        logger.info(f"Ping: {i}")
        try:
            response = requests.head(site.get_https())
            site_status.update_count_success()
            site_status.evaluate_response(response)

        except requests.ConnectionError:
            site_status.update_count_fail()

    return site_status


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

    site_status = check_site_status(site)

    logger.info(f"Success Count: {site_status.count_success}")
    logger.info(f"Fail Count: {site_status.count_fail}")
    logger.info(f"OK Count: {site_status.count_ok}")
    logger.info(f"Client Error Count: {site_status.count_client_error}")
    logger.info(f"Server Error Count: {site_status.count_server_error}")

    update_dynamo_item(
        item_id,
        site_status
    )

    return {"statusCode": 200,
            "headers": {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            "body": json.dumps({
                "count_success": site_status.count_success,
                "count_fail": site_status.count_fail
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
