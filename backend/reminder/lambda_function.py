from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig
from aws_lambda_powertools.utilities.typing import LambdaContext

from src.get_reminders import get_reminders
from src.set_reminder import set_reminder

cors_config = CORSConfig(allow_origin="*", max_age=300)
app = APIGatewayRestResolver(cors=cors_config)


@app.post("/set")
def reminder_setter():
    data = app.current_event.json_body
    return set_reminder(data)


@app.post("/get")
def reminder_getter():
    data = app.current_event.json_body
    return get_reminders(data)


def lambda_handler(event: dict, context: LambdaContext) -> dict:
    return app.resolve(event, context)
