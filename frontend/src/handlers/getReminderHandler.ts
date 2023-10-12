import { getReminder } from '../api/reminder';
import { GetReminderData } from '../types';

async function reminderHandler(
  event: Event,
  tableBody: HTMLTableSectionElement,
  reminderButton: HTMLButtonElement
) {
  event.preventDefault();

  console.log('This is hell');

  if (event.target instanceof HTMLFormElement) {
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data) as never as GetReminderData;

    try {
      reminderButton.disabled = true;
      reminderButton.classList.add('spinning');
      const response = await getReminder(payload);
      if (response.items.length) {
        tableBody.innerHTML = '';

        response.items.forEach((item, index: number) => {
          const row = tableBody.insertRow();
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          cell1.classList.add('column1');
          cell2.classList.add('column2');
          cell3.classList.add('column3');
          cell1.textContent = `${index + 1}`;
          cell2.textContent = `${item.remaining_time}`;
          cell3.textContent = `${item.message}`;
        });
      }
    } catch (error) {
      throw error;
    } finally {
      reminderButton.disabled = false;
      reminderButton.classList.remove('spinning');
    }
  }
}

export { reminderHandler };
