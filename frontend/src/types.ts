type Payload = {
  user_id: string;
  ttl: number;
  message: string;
  notification_type: 'SMS' | 'EMAIL';
};

type Response = {
  message: string;
};

export type { Payload, Response };
