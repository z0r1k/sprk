require('../log');
const Collection = require('./collection.mock.js');
const col = new Collection();
const data = require('../data.js');

describe('Collection', () => {
  beforeAll(() => {
    col.connect();
  });

  it('should build filter query', () => {
    expect(Collection.buildQuery({
      'hasPhoto': true,
      'isContact': false,
      'isFavourite': false,
      'scoreMin': 0.5,
      'scoreMax': 0.8,
      'ageMin': 18,
      'ageMax': 25,
      'heightMin': 140,
      'heightMax': 185,
      'distance': 35
    }))
    .toEqual({
      'main_photo': {
        '$exists': true
      },
      'contacts_exchanged': {
        '$eq': 0
      },
      'favourite': false,
      'compatibility_score': {
        '$gte': 0.5,
        '$lte': 0.8
      },
      'age': {
        '$gte': 18,
        '$lte': 25
      },
      'height_in_cm': {
        '$gte': 140,
        '$lte': 185
      },
      'city.loc': {
        '$geoWithin': {
          '$centerSphere': [
            [-1.772232, 51.568535],
            0.00549364307016167
          ]
        }
      }
    });

    expect(Collection.buildQuery({
      'hasPhoto': false,
      'isContact': true,
      'isFavourite': true,
      'heightMin': 140
    })).toEqual({
      'main_photo': {
        '$exists': false
      },
      'contacts_exchanged': {
        '$ne': 0
      },
      'favourite': true,
      'height_in_cm': {
        '$gte': 140
      }
    });

    expect(Collection.buildQuery({})).toEqual({});
  });

  it('should return filtered results', async () => {
    expect(await col.find()).toEqual([data]);
  });

});
