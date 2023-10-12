import { reminderHandler } from '../handlers';

const tableBody = document.getElementById('tbody') as HTMLTableSectionElement;
const getReminderButton = document.getElementById(
  'reminders'
) as HTMLButtonElement;
const reminderForm = document.getElementById(
  'reminder_form'
) as HTMLFormElement;
reminderForm.addEventListener('submit', (event) => {
  reminderHandler(event, tableBody, getReminderButton);
});
