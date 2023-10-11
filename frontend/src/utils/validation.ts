function checkTTLValidity(ttl: number): void {
  if (ttl < 0) {
    alert('Reminder time cannot be less than current time');
    throw new Error('Reminder time cannot be less than current time');
  }
}

export { checkTTLValidity };
