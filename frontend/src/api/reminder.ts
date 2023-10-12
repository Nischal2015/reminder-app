import { fetchAPI } from '../lib/fetch';
import type { PostData, GetReminderData } from '../types';

interface PostDataResponse {
  message: string;
}

interface GetReminderResponse {
  items: PostData[];
}

async function createReminder(postData: PostData): Promise<PostDataResponse> {
  try {
    const data = await fetchAPI<PostData>('/v1/set', 'POST', postData);
    return data;
  } catch (error) {
    throw error;
  }
}

async function getReminder(
  getData: GetReminderData
): Promise<GetReminderResponse> {
  try {
    const data = await fetchAPI<GetReminderResponse>(
      `/v1/get`,
      'POST',
      getData
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export { createReminder, getReminder };
