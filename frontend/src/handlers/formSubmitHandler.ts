import { createReminder } from '../api/reminder';
import { PostData } from '../types';
import { checkTTLValidity, getTimeInterval } from '../utils';

function formSubmit(
  event: Event,
  button: HTMLButtonElement,
  form: HTMLFormElement
): void {
  event.preventDefault();

  if (event.target instanceof HTMLFormElement) {
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data) as never as PostData;

    const userInputDatetime = payload['remaining_time'];
    const userDatetime = new Date(userInputDatetime);

    const ttl = getTimeInterval(userDatetime);
    checkTTLValidity(ttl);
    payload['remaining_time'] = ttl;

    async function postReminder() {
      try {
        button.disabled = true;
        button.classList.add('spinning');
        const data = await createReminder(payload);
        form.reset();
        alert(data.message);
      } catch (error) {
        throw error;
      } finally {
        button.disabled = false;
        button.classList.remove('spinning');
      }
    }

    postReminder();
  }
}

export { formSubmit };
