import json
import traceback
import requests
from site_url import SiteURL

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


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
    logger.info(event.get("queryStringParameters"))

    # TODO: take event from SNS not API gateway

    query_string: dict = event.get("queryStringParameters")

    if not query_string:
        raise Exception("No query string provided")

    site: str | None = query_string.get("site")

    if not site:
        raise Exception("No Website Provided")

    site: SiteURL = SiteURL(site)
    logger.info(f"Site: {site.get_https}")
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
        logger.error(e)
        logger.error(traceback.format_exc())
        return {
            "statusCode": 500,
            "body": json.dumps(
                {"error": "An error occurred"}
            )
        }
