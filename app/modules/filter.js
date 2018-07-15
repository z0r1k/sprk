const enforce = require("enforce");

/**
 * @swagger
 * definitions:
 *   Location:
 *     type: "object"
 *     properties:
 *       name:
 *         type: "string"
 *       loc:
 *        type: "object"
 *        properties:
 *          x:
 *            type: "number"
 *            format: "float"
 *          y:
 *            type: "number"
 *            format: "float"
 *   Match:
 *     type: "object"
 *     required:
 *       - "display_name"
 *     properties:
 *       _id:
 *         type: "string"
 *         example: "507c35dd8fada716c89d0013"
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

module.exports = async (col, filters = {}) => {
  if (!col) {
    let err = new Error('No collection available');
    err.code = 500;
    err.data = err.message;
    throw err;
  }

  const checks  = new enforce.Enforce({ returnAllErrors : true });

  if (filters.scoreMin) { checks.add('scoreMin', enforce.ranges.number(0.01, 0.99)); }
  if (filters.scoreMax) { checks.add('scoreMax', enforce.ranges.number(0.01, 0.99)); }

  if (filters.ageMin) { checks.add('ageMin', enforce.ranges.number(18, 95)); }
  if (filters.ageMax) { checks.add('ageMax', enforce.ranges.number(18, 95)); }

  if (filters.heightMin) { checks.add('heightMin', enforce.ranges.number(135, 210)); }
  if (filters.heightMax) { checks.add('heightMax', enforce.ranges.number(135, 210)); }

  if (filters.distance) { checks.add('distance', enforce.ranges.number(30, 300)); }

  checks.check(filters, errors => {
    if (errors && errors.length) {
      console.warn('Validation error', errors);

      let err = new Error('Validation errors');
      err.code = 400;
      err.data = errors;

      throw err;
    }
  });

  try {
    return await col.find(filters);
  } catch (err) {
    err.code = 500;
    err.data = err.message;
    throw err;
  }
};
