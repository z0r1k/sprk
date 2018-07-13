const typeHelper = require('../helpers/type');
const enforce = require("enforce");
const checks  = new enforce.Enforce();

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
   *         type: "integer"
   *         minimum: 1
   *         maximum: 99
   *       - name: "age"
   *         in: "query"
   *         description: "Age"
   *         type: "integer"
   *         minimum: 18
   *         maximum: 95
   *       - name: "height"
   *         in: "query"
   *         description: "Height"
   *         type: "integer"
   *         minimum: 135
   *         maximum: 210
   *       - name: "distance"
   *         in: "query"
   *         description: "Distance"
   *         type: "integer"
   *         minimum: 30
   *         maximum: 300
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
    const {
      photo,
      contact,
      fav,
      score,
      age,
      height,
      distance
    } = req.query;

    const filters = {
      hasPhoto: typeHelper.getBool(photo),
      isContact: typeHelper.getBool(contact),
      isFavourite: typeHelper.getBool(fav),
      score: typeHelper.getInt(score) / 100,
      age: typeHelper.getInt(age),
      height: typeHelper.getInt(height),
      distance: typeHelper.getInt(distance)
    };

    let validationError = null;

    checks
      .add('score', enforce.ranges.number(0.01, 0.99))
      .add('age', enforce.ranges.number(18, 95))
      .add('height', enforce.ranges.number(135, 210))
      .add('distance', enforce.ranges.number(30, 300))

      .check(filters, err => {
        console.warn('Validation error', err);

        const { property, msg } = err;
        validationError = {error: { property, msg }};
      });

    if (validationError) {
      return res.status(400).send(validationError);
    }

    return res.send(filters);
  });

  return router;
};
