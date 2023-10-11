import { BASE_URL } from '../constants';

type HTTPRequest = 'GET' | 'POST';

interface BaseRequestOptions {
  method: HTTPRequest;
  headers: Record<string, string>;
}

type RequestOptions = BaseRequestOptions &
  (BaseRequestOptions['method'] extends 'POST'
    ? { body: string }
    : { body?: string });

async function fetchAPI<T>(
  pathname: string,
  method: 'GET',
  payload?: Record<string, any>,
  headers?: Record<string, string>
): Promise<T>;

async function fetchAPI<T>(
  pathname: string,
  method: 'POST',
  payload: Record<string, any>,
  headers?: Record<string, string>
): Promise<T>;

async function fetchAPI<T>(
  pathname: string,
  method: HTTPRequest,
  payload: Record<string, any> = {},
  headers?: Record<string, string>
): Promise<T> {
  const requestOptions: RequestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (method === 'POST') {
    requestOptions.body = JSON.stringify(payload);
  }

  const response = await fetch(`${BASE_URL}${pathname}`, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

export { fetchAPI };
