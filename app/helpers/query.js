const type = require('../helpers/type');

module.exports = {
  getFilters: query => {
    let filters = {};

    const {
      photo,
      contact,
      fav,
      score,
      age,
      height,
      distance
    } = query;

    if (photo) { filters.hasPhoto = type.getBool(photo); }
    if (contact) { filters.isContact = type.getBool(contact); }
    if (fav) { filters.isFavourite = type.getBool(fav); }

    const [ scoreMin, scoreMax ] = type.getList(score);
    if (scoreMin) { filters.scoreMin = type.getInt(scoreMin) / 100; }
    if (scoreMax) { filters.scoreMax = type.getInt(scoreMax) / 100; }

    const [ ageMin, ageMax ] = type.getList(age);
    if (ageMin) { filters.ageMin = type.getInt(ageMin); }
    if (ageMax) { filters.ageMax = type.getInt(ageMax); }

    const [ heightMin, heightMax ] = type.getList(height);
    if (heightMin) { filters.heightMin = type.getInt(heightMin); }
    if (heightMax) { filters.heightMax = type.getInt(heightMax); }

    const [ distanceMin, distanceMax ] = type.getList(distance);
    if (distanceMin) { filters.distanceMin = type.getInt(distanceMin); }
    if (distanceMax) { filters.distanceMax = type.getInt(distanceMax); }

    return filters;
  }
};
