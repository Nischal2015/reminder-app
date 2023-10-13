from datetime import datetime, timezone
from ..constants import app


def get_now_unix_timestamp():
    return int(datetime.now(timezone.utc).timestamp())


def get_unix_timestamp(timer):
    now = get_now_unix_timestamp()
    unix_timestamp = now + timer

    return unix_timestamp


def get_time_difference_in_hours_and_mins(ttl):
    now = get_now_unix_timestamp()
    time_difference = ttl - now

    days, time_difference = divmod(time_difference, 86400)
    hours, time_difference = divmod(time_difference, 3600)
    minutes, time_difference = divmod(time_difference, 60)

    result = []

    if days > 0:
        result.append(f"{days}d")

    if hours > 0:
        result.append(f"{hours}h")

    if minutes > 0:
        result.append(f"{minutes}m")

    return " ".join(result)
