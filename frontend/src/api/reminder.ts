import { fetchAPI } from '../lib/fetch';
import type { PostData } from '../types';

interface PostDataResponse {
  message: string;
}

async function createReminder(postData: PostData): Promise<PostDataResponse> {
  try {
    const data = await fetchAPI<PostData>('/v1/set', 'POST', postData);
    return data;
  } catch (error) {
    throw error;
  }
}

// async function getReminder(): Promise<PostData[]> {}

export { createReminder };
