import boto3
from ..constants import config

dynamodb = boto3.resource("dynamodb", region_name="us-east-1")


def get_dynamodb_table():
    table = dynamodb.Table(config.DYNAMODB_TABLE)
    return table
