import { getReminder } from './api/reminder';
import { updateUserIdInput, formSubmit } from './handlers';
import { GetReminderData } from './types';

const notificationType = document.getElementById(
  'notification_type'
) as HTMLSelectElement;
const userId = document.getElementById('user_id') as HTMLInputElement;
notificationType.addEventListener('input', () => {
  updateUserIdInput(notificationType, userId);
});

const send = document.getElementById('send') as HTMLButtonElement;
const form = document.getElementById('form') as HTMLFormElement;
form.addEventListener('submit', (event) => {
  formSubmit(event, send, form);
});

const reminderForm = document.getElementById(
  'reminder_form'
) as HTMLFormElement;
reminderForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (event.target instanceof HTMLFormElement) {
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data) as never as GetReminderData;

    const response = await getReminder(payload);
    console.log(response);
  }
});
