import express from 'express';
import User from '../models/user';
const router = express.Router();

/**
 * @swagger
 * resourcePath: /api
 * descrption: All about API
 */

/**
 * @swagger
 * path: /v1/users
 * operations:
 *   -  httpMethod: GET
 *      summary: Login with username and password
 *      notes: Returns a user based on username
 *      responseClass: User
 *      nickname: login
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: username
 *          description: Your username
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Your password
 *          paramType: query
 *          required: true
 *          dataType: string
 */
router.get("/", (req, res) => {
  res.status(404)
    .send();
});

/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       username:
 *         type: String
 *       password:
 *         type: String
 **/
router.get("/:id", (req, res) => {
  res.status(404)
    .send();
});

router.post("/", (req, res) => {
  res.status(404)
    .send();
});

router.put("/:id", (req, res) => {
  res.status(404)
    .send();
});

router.delete("/:id", (req, res) => {
  res.status(404)
    .send();
});


module.exports = router;
