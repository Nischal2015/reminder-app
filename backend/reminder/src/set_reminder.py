import json
import uuid
from aws_lambda_powertools.event_handler import Response, content_types

from .enums.notification_enums import NotificationType
from .utils import time
from .modules.dynamodb import get_dynamodb_table

table = get_dynamodb_table()


def set_reminder(data):
    notification_type = data.get("notification_type")
    ttl = time.get_unix_timestamp(data.get("remaining_time"))

    if notification_type in NotificationType.__members__:
        data["notification_type"] = NotificationType[notification_type].value
        data["ttl"] = ttl
        data["uuid"] = str(uuid.uuid4())

        try:
            table.put_item(Item=data)
            return Response(
                status_code=200,
                content_type=content_types.APPLICATION_JSON,
                body=json.dumps({"message": "Your reminder is successfully set"}),
            )

        except Exception as e:
            return Response(
                status_code=400,
                content_type=content_types.APPLICATION_JSON,
                body=json.dumps(e),
            )
