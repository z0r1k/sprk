﻿try {
  const data = JSON.parse(cat('/data/matches.json'))
  const db = new Mongo().getDB('spark')

  db.createCollection('matches')
  db.matches.insert(data.matches)

﻿  print('Matches imported', data.matches.length)
} catch(e) { print(e) }
