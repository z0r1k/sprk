require('../log');
const filter = require('../../modules/filter.js');
const Collection = require('./collection.mock.js');
const col = new Collection();
const data = require('../data.js');

describe('Filter', () => {
  beforeAll(() => {
    col.connect();
  });

  it('should throw err 500', async () => {
    try {
      await filter();
    } catch (e) {
      expect(e.code).toBe(500);
      expect(e.data).toBeDefined();
    }
  });

  it('should throw err 400', async () => {
    try {
      await filter(col, {
        scoreMin: 0,
        scoreMax: 1
      });
    } catch (e) {
      expect(e.code).toBe(400);
      expect(e.data).toBeDefined();
    }
  });

  it('should return data', async () => {
      const filteredData = await filter(col, {});
      expect(filteredData).toEqual([data]);
  });

});
