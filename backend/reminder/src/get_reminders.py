from boto3.dynamodb.conditions import Key
import json
from aws_lambda_powertools.event_handler import Response, content_types

from .modules.dynamodb import get_dynamodb_table
from .utils.time import get_time_difference_in_hours_and_mins

table = get_dynamodb_table()


def get_reminders(data):
    user_id = data.get("user_id")

    response = table.query(
        IndexName="user_id-ttl-index",
        Select="SPECIFIC_ATTRIBUTES",
        ProjectionExpression="user_id, notification_type, message, #ttl",
        ExpressionAttributeNames={"#ttl": "ttl"},
        KeyConditionExpression=Key("user_id").eq(user_id),
    )

    for i, res in enumerate(response["Items"]):
        ttl = response["Items"][i].pop("ttl")
        response["Items"][i]["remaining_time"] = get_time_difference_in_hours_and_mins(
            ttl
        )

    return Response(
        status_code=200,
        content_type=content_types.APPLICATION_JSON,
        body=json.dumps({"items": response["Items"]}, default=str),
    )
