import json
import requests

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def check_site_status(site: str) -> tuple:
    count_success = 0
    count_fail = 0

    for i in range(3):
        logger.info(f"Ping: {i}")
        try:
            requests.head(site)
            count_success += 1
        except requests.ConnectionError:
            count_fail += 1

    return count_success, count_fail


def dispatch(event, context):
    logger.info(event)
    logger.info(event.get("queryStringParameters"))

    query_string: dict = event.get("queryStringParameters")

    if not query_string:
        raise Exception("No query string provided")

    site: str | None = query_string.get("site")

    if not site:
        raise Exception("No Website Provided")

    count_success, count_fail = check_site_status(site)

    body = {
        "count_success": count_success,
        "count_fail": count_fail
    }

    return {"statusCode": 200, "body": json.dumps(body)}


def lambda_handler(event, context):
    try:
        return dispatch(event, context)

    except Exception as e:
        logger.info(e)
        return {"statusCode": 500, "body": json.dumps("health check failed")}
