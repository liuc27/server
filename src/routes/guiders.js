import express from 'express';
import Guider from '../models/guider';
const router = express.Router();

/**
 * @swagger
 * resourcePath: /v1/guiders
 * descrption: All about guiders API
 */

/**
 * @swagger
 * path: /v1/guiders
 * operations:
 *   -  httpMethod: GET
 *      summary: ガイドリスト取得
 *      notes: 条件
 *      responseClass: Guider
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

/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       name:
 *         type: String
 *       password:
 *         type: String
 *       email:
 *         type: String
 *       age:
 *         type: String
 *       image:
 *         type: String
 *       country:
 *         type: String
 *       language:
 *         type: String
 *       occupation:
 *         type: String
 *       pay:
 *         type: String
 *       grade:
 *         type: String
 *       created:
 *         type: String
 *       updated:
 *         type: String
 **/
router.get("/", (req, res) => {
  res.status(404)
    .send();
});

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
