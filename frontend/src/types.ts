type NotificationType = 'SMS' | 'EMAIL';

interface PostData {
  user_id: string;
  ttl: number;
  message: string;
  notification_type: NotificationType;
}

export type { NotificationType, PostData };
