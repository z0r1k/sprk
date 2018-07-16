const Collection = require('../../modules/collection.js');

class CollectionMock extends Collection {
  // @todo use sinon or something for better mock/stub
  async connect() {
    this._collection = {
      _data: {
        "_id": "5b4b71ed13fce51ffffcd8d2",
        "display_name": "Anne",
        "age": 38,
        "job_title": "Marketing Consultant",
        "height_in_cm": 170,
        "city": {
          "name": "Swindon",
          "loc": {
            "x": -1.772232,
            "y": 51.568535
          }
        },
        "main_photo": "http://thecatapi.com/api/images/get?format=src&type=gif",
        "compatibility_score": 0.88,
        "contacts_exchanged": 0,
        "favourite": false,
        "religion": "Jewish"
      },
      find: async (query = {}) => {
        return Promise.resolve(this._collection);
      },
      toArray: async () => {
        return Promise.resolve([this._collection._data]);
      }
    };

    return Promise.resolve(this._collection);
  }
}

module.exports = CollectionMock;
