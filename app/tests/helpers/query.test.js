require('../log');
const queryHelper = require('../../helpers/query');

describe('QueryHelper', () => {
  it('should return empty object is there are no filters', () => {
    const filters = queryHelper.getFilters({});
    expect(Object.keys(filters).length).toBe(0);
  });

  it('should return valid filtes for given query parameters', () => {
    const query = {
      'photo': 'true',
      'contact': 'true',
      'fav': 'false',
      'score': '50,80',
      'age': '18,25',
      'height': '140,185',
      'distance': '35'
    };

    const expectedFilters = {
      'hasPhoto': true,
      'isContact': true,
      'isFavourite': false,
      'scoreMin': 0.5,
      'scoreMax': 0.8,
      'ageMin': 18,
      'ageMax': 25,
      'heightMin': 140,
      'heightMax': 185,
      'distance': 35
    };

    const actualFilters = queryHelper.getFilters(query);
    expect(actualFilters).toEqual(expectedFilters);
  });
});
