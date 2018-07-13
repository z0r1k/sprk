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
