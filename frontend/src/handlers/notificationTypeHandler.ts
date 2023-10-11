function updateUserIdInput(
  notificationType: HTMLSelectElement,
  userId: HTMLInputElement
) {
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

export { updateUserIdInput };
