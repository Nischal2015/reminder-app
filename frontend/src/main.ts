import type { Payload, Response } from './types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const form = document.getElementById('form') as HTMLFormElement;
const notificationType = document.getElementById(
  'notification_type'
) as HTMLSelectElement;
const userId = document.getElementById('user_id') as HTMLInputElement;
const button = document.getElementById('send') as HTMLButtonElement;

notificationType.addEventListener('input', onUserIdChange);
form.addEventListener('submit', onFormSubmit);

function onUserIdChange() {
  const value = notificationType.value;
  let placeholder = '';
  let type = 'text';

  switch (value) {
    case 'EMAIL':
      placeholder = 'Email';
      type = 'email';
      break;

    case 'SMS':
      placeholder = 'Phone Number';
      type = 'tel';
      break;

    default:
      placeholder = 'User Id';
  }

  userId.placeholder = `Enter your ${placeholder}`;
  userId.type = type;
}

function onFormSubmit(event: Event): void {
  event.preventDefault();

  if (event.target instanceof HTMLFormElement) {
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data) as never as Payload;

    const userInputDatetime = payload['ttl'];
    const userDatetime = new Date(userInputDatetime);

    const ttl = getTimeInterval(userDatetime);
    checkTTLValidity(ttl);
    payload['ttl'] = ttl;

    button.disabled = true;
    button.classList.add('spinning');

    async function postReminder() {
      try {
        const response: Response = await postData(
          `${BASE_URL}/v1/set`,
          payload
        );
        form.reset();
        alert(response.message);
      } catch (error) {
        console.log(error);
      } finally {
        button.disabled = false;
        button.classList.remove('spinning');
      }
    }

    postReminder();
  }
}

function getTimeInterval(time: Date) {
  const currentDateTime = new Date().getTime() / 1000;
  const userDateTime = time.getTime() / 1000;

  return Math.floor(userDateTime - currentDateTime);
}

function checkTTLValidity(ttl: number) {
  if (ttl < 0) {
    alert('Reminder time cannot be less than current time');
    throw new Error('Reminder time cannot be less than current time');
  }
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
