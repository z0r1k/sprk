const mongo = require('mongodb');

class Collection {
  constructor() {
    this._collection = null;
  }

  async connect() {
    return mongo.MongoClient
      .connect(process.env.DB, { useNewUrlParser: true })

      .then(client => {
        const db = client.db(process.env.DB_NAME);
        return db.createCollection(process.env.COL_NAME)
          .then(col => col)

          .catch(err => {
            if (err.codeName === 'NamespaceExists') {
              return db.collection(process.env.COL_NAME)
            }

            console.warn('Failed to get collection', err);
            return Promise.reject(err);
          });
      })

      .then(col => {
        this._collection = col;
        return col;
      })

      .catch(err => {
        console.warn('Failed to connect to db', err);
        return Promise.reject(err);
      });
  }

  async find(filters = {}) {
    if (!this._collection) {
      throw new Error('No connection to DB');
    }

    try {
      const result = await this._collection.find(this._buildQuery(filters));
      return await result.toArray();
    } catch (err) { console.warn('Failed to fetch results', err); }

    return [];
  }

  _buildQuery(filters = {}) {
    let query = {};

    if (Object.keys(filters).length) {
      if (filters.hasPhoto !== undefined) {
        query.main_photo = {
          '$exists': filters.hasPhoto,
          '$nin': ['']
        };
      }

      if (filters.isContact !== undefined) {
        query.contacts_exchanged = filters.isContact ? { '$ne': 0 } : { '﻿$eq': 0 };
      }

      if (filters.isFavourite !== undefined) {
        query.favourite = filters.isFavourite;
      }

      if (filters.scoreMin) {
        query.compatibility_score = query.compatibility_score || {};
        query.compatibility_score['$gte'] = filters.scoreMin;
      }
      if (filters.scoreMax) {
        query.compatibility_score = query.compatibility_score || {};
        query.compatibility_score['$lte'] = filters.scoreMax;
      }

      if (filters.ageMin) {
        query.age = query.age || {};
        query.age['$gte'] = filters.ageMin;
      }
      if (filters.ageMax) {
        query.age = query.age || {};
        query.age['$lte'] = filters.ageMax;
      }

      if (filters.heightMin) {
        query.height_in_cm = query.height_in_cm || {};
        query.height_in_cm['$gte'] = filters.heightMin;
      }
      if (filters.heightMax) {
        query.height_in_cm = query.height_in_cm || {};
        query.height_in_cm['$lte'] = filters.heightMax;
      }

      // distance
    }

    return query;
  }
}

module.exports = Collection;
