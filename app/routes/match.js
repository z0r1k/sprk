const filter = require('../modules/filter');
const collection = new (require('../modules/collection'))();
const query = require('../helpers/query');

module.exports = router => {
  /**
   * @swagger
   * /match:
   *   get:
   *     tags:
   *       - "match"
   *     summary: "Finds matches"
   *     description: "Find matched by provided filters"
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "photo"
   *         in: "query"
   *         description: "Has photo"
   *         type: "boolean"
   *       - name: "contact"
   *         in: "query"
   *         description: "Added to contacts"
   *         type: "boolean"
   *       - name: "fav"
   *         in: "query"
   *         description: "Added to favourites"
   *         type: "boolean"
   *       - name: "score"
   *         in: "query"
   *         description: "Compatibility score"
   *         type: "array"
   *         items:
   *           type: "integer"
   *           minimum: 1
   *           maximum: 99
   *           minItems: 0
   *           maxItems: 2
   *       - name: "age"
   *         in: "query"
   *         description: "Age"
   *         type: "array"
   *         items:
   *           type: "integer"
   *           minimum: 18
   *           maximum: 95
   *           minItems: 0
   *           maxItems: 2
   *       - name: "height"
   *         in: "query"
   *         description: "Height"
   *         type: "array"
   *         items:
   *           type: "integer"
   *           minimum: 135
   *           maximum: 210
   *           minItems: 0
   *           maxItems: 2
   *       - name: "distance"
   *         in: "query"
   *         description: "Distance"
   *         type: "array"
   *         items:
   *           type: "integer"
   *           minimum: 30
   *           maximum: 300
   *           minItems: 0
   *           maxItems: 2
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           type: "array"
   *           items:
   *             $ref: "#/definitions/Match"
   *       400:
   *         description: "Bad request"
   *       500:
   *         description: "Something went wrong"
   *     deprecated: false
   */
  router.get('/', async (req, res) => {
    const filters = query.getFilters(req.query);
    
    try {
      await collection.connect();
      return res.status(200).send({ matches: await filter(collection, filters) });
    } catch (err) {
      console.warn('Oops', err);
      return res.status(err.code).send({ error: err.data });
    }
  });

  return router;
};
