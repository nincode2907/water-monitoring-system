const { calculationTimeDiff } = require('./methodCal.js');

function formatMessage(message) {
  const keyValuePairs = message.replace('station1:', '').split(',').map(pair => pair.trim());
  const formattedObject = {};

  keyValuePairs.forEach(pair => {
    const [key, value] = pair.split('=').map(item => item.trim());
    formattedObject[key] = isNaN(value) ? value : parseFloat(value);
  });

  return formattedObject;
}

describe('formatMessage', () => {
  test('should return an object with formatted key-value pairs', () => {
    const message = 'station1: key1=value1, key2=value2, key3=value3';
    const expected = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    };
    expect(formatMessage(message)).toEqual(expected);
  });

  test('should handle decimal values correctly', () => {
    const message = 'station1: key1=1.23, key2=4.56';
    const expected = {
      key1: 1.23,
      key2: 4.56
    };
    expect(formatMessage(message)).toEqual(expected);
  });

  test('should handle string values correctly', () => {
    const message = 'station1: key1=hello, key2=world';
    const expected = {
      key1: 'hello',
      key2: 'world'
    };
    expect(formatMessage(message)).toEqual(expected);
  });

  test('should handle empty message correctly', () => {
    const message = '';
    const expected = {};
    expect(formatMessage(message)).toEqual(expected);
  });

  test('should handle invalid input correctly', () => {
    const message = 'station1: key1=1.23, key2=hello';
    const expected = {
      key1: 1.23,
      key2: 'hello'
    };
    expect(formatMessage(message)).toEqual(expected);
  });
});


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
