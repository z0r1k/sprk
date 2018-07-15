﻿try {
  const matches = JSON.parse(cat('/data/matches.json'));
  const db = new Mongo().getDB('spark');

  const data = matches.matches.map(match => {
    let copy = Object.assign({}, match);

    copy.city.loc = { x: copy.city.lon, y: copy.city.lat };
    delete copy.city.lon;
    delete copy.city.lat;

    return copy;
  });

  db.createCollection('matches');
  db.matches.insert(data);

  print('Matches imported', data.length);
} catch(e) { print(e); }
