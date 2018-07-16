require('../log');
const typeHelper = require('../../helpers/type.js');

describe('TypeHelper', () => {
  it('should return integer', () => {
    expect(typeHelper.getInt('50')).toBe(50);
    expect(typeHelper.getInt('test')).toBe(0);
  });

  it('should return boolean', () => {
    expect(typeHelper.getBool('true')).toBe(true);
    expect(typeHelper.getBool('false')).toBe(false);
    expect(typeHelper.getBool('test')).toBe(false);
  });

  it('should return array', () => {
    expect(typeHelper.getList('1,10')).toEqual(['1', '10']);
    expect(typeHelper.getList('1,')).toEqual(['1', '']);
    expect(typeHelper.getList(',10')).toEqual(['', '10']);
    expect(typeHelper.getList('test')).toEqual(['test']);
  });
});
