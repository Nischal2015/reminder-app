import json
import boto3

ses = boto3.client("ses")


def lambda_handler(event, context):
    for record in event["Records"]:
        old_image = record["dynamodb"]["OldImage"]

        notification_type = old_image["notification_type"]["S"]
        destination = old_image["user_id"]["S"]
        source = "nischalshakya2015@gmail.com"
        message = old_image["message"]["S"]
        subject = "Reminder for you"

        if notification_type == "email":
            response = ses.send_email(
                Source=source,
                Destination={"ToAddresses": [destination]},
                Message={
                    "Subject": {"Data": subject},
                    "Body": {"Html": {"Data": f'This is to remind "{message}"'}},
                },
            )
