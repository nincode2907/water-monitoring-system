const { calculationTimeDiff } = require('./methodCal.js');


describe('calculationTimeDiff', () => {
  test('should return correct time difference string for recent time', () => {
    const timeNotify = new Date();
    const result = calculationTimeDiff(timeNotify);
    expect(result).toMatch(/seconds ago|minutes ago|hours ago/);
  });

  test('should return correct time difference string for past time', () => {
    const timeNotify = new Date('2020-01-01');
    const result = calculationTimeDiff(timeNotify);
    expect(result).toMatch(/days ago|months ago|years ago/);
  });

  test('should return empty string for empty timeNotify', () => {
    const timeNotify = null;
    const result = calculationTimeDiff(timeNotify);
    expect(result).toBe('');
  });

  it('should return "5 seconds ago" for a time difference of 5 seconds', () => {
    const now = new Date();
    const timeNotify = new Date(now.getTime() - 5000); // 5 seconds ago
    const result = calculationTimeDiff(timeNotify);
    expect(result).toBe('5 seconds ago');
  });

  it('should return "2 minutes ago" for a time difference of 2 minutes', () => {
    const now = new Date();
    const timeNotify = new Date(now.getTime() - 120000); // 2 minutes ago
    const result = calculationTimeDiff(timeNotify);
    expect(result).toBe('2 minutes ago');
  });

  it('should return "3 hours ago" for a time difference of 3 hours', () => {
    const now = new Date();
    const timeNotify = new Date(now.getTime() - 10800000); // 3 hours ago
    const result = calculationTimeDiff(timeNotify);
    expect(result).toBe('3 hours ago');
  });
});
