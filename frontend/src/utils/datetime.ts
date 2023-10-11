function getTimeInterval(time: Date): number {
  const currentDateTime = new Date().getTime() / 1000;
  const userDateTime = time.getTime() / 1000;

  return Math.floor(userDateTime - currentDateTime);
}

export { getTimeInterval };
