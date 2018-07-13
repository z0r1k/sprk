module.exports = router => {
  /**
   * @swagger
   * definitions:
   *   Location:
   *     type: "object"
   *     properties:
   *       name:
   *         type: "string"
   *       lat:
   *         type: "number"
   *         format: "float"
   *       lon:
   *         type: "number"
   *         format: "float"
   *   Match:
   *     type: "object"
   *     required:
   *       - "display_name"
   *     properties:
   *       display_name:
   *         type: "string"
   *         example: "Max"
   *       age:
   *         type: "integer"
   *         minimum: 18
   *         maximum: 95
   *         example: 30
   *       job_title:
   *         type: "string"
   *         example: "Driver"
   *       height_in_cm:
   *         type: "integer"
   *         minimum: 135
   *         maximum: 210
   *         example: 165
   *       city:
   *         $ref: "#/definitions/Location"
   *       main_photo:
   *         type: "string"
   *         example: "http://thecatapi.com/api/images/get?format=src&type=gif"
   *       compatibility_score:
   *         type: "number"
   *         format: "float"
   *         minimum: 0.01
   *         maximum: 0.99
   *         example: 0.45
   *       contacts_exchanged:
   *         type: "integer"
   *         example: 2
   *       favourite:
   *         type: "boolean"
   *         example: false
   *       religion:
   *         type: "string"
   *         example: "Atheist"
   *       enum:
   *         - "Agnostic"
   *         - "Christian"
   *         - "Atheist"
   *         - "Buddhist"
   *         - "Islam"
   *         - "Jewish"
   */

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
  router.get('/', (req, res) => {
    return res.send();
  });

  return router;
};
