import { updateUserIdInput, formSubmit } from './handlers';

const notificationType = document.getElementById(
  'notification_type'
) as HTMLSelectElement;
const userId = document.getElementById('user_id') as HTMLInputElement;
notificationType.addEventListener('input', () => {
  updateUserIdInput(notificationType, userId);
});

const button = document.getElementById('send') as HTMLButtonElement;
const form = document.getElementById('form') as HTMLFormElement;
form.addEventListener('submit', (event) => {
  formSubmit(event, button, form);
});
