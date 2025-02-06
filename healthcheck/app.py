import json
import requests


def check_site_status(site: str):
    for i in range(10):
        requests.head(site)


def dispatch(context, event):
    query_string: dict = json.loads(context.query_string_parameters)

    if not query_string:
        raise Exception("No query string provided")

    site: str | None = query_string.get("site")

    if not site:
        raise Exception("No Website Provided")


def lambda_handler(event, context):
    dispatch(event, context)

    return {"statusCode": 200, "body": json.dumps("health check")}
