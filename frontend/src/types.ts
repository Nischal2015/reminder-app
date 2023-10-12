type NotificationType = 'SMS' | 'EMAIL';

interface GetReminderData {
  user_id: string;
}

interface PostData extends GetReminderData {
  remaining_time: number;
  message: string;
  notification_type: NotificationType;
}

export type { NotificationType, GetReminderData, PostData };
