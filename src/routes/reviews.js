import express from 'express';
import Review from '../models/review';
import mongoose from 'mongoose';
const router = express.Router();

/**
 * @swagger
 * resourcePath: /v1/reviews
 * descrption: All about API
 */

/**
 * @swagger
 * path: /v1/reviews
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
  const user_id = req.query.user_id;
  const guider_id = req.query.guider_id;
  const sort = req.query.sort;
  const skip = req.query.skip;
  const limit = req.query.limit;

  let query = {};
  if(user_id) {
    query.user_id = user_id;
  }
  if(guider_id) {
    query.guider_id = guider_id;
  }

  let sortClause = {
    "_id": -1
  }

  let limitClause = 50;
  Review.find(query)
  .sort(sortClause)
  .limit(limitClause)
  .exec((err, result) => {
    res.status(200)
      .send(result);
  });
});

/**
 * @swagger
 * models:
 *   Review:
 *     id: User
 *     properties:
 *       comment:
 *         type: String
 *       grade:
 *         type: String
 **/
router.get("/:id", (req, res) => {
  const _id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400)
      .send({
        error: "INVALID ID",
        code: 1
      });
  }
  Review.findById(_id, (err, result) => {
    if(err) {
      throw err;
    }

    if(!result) {
      return res.status(404)
        .send({
          error: "NO RESOURCE",
          code: 3
        });
    }
 
    return res.status(200)
      .send(result);
  });
});

router.post("/", (req, res) => {
  const user_id = req.body.user_id;
  const guider_id = req.body.guider_id;
  const comment = req.body.comment;
  const grade = req.body.grade;
  const currentTime = new Date();

  const review = new Review({
    user_id: user_id,
    guider_id: guider_id,
    comment: comment,
    grade: grade,
    created: currentTime,
    updated: currentTime
  });

  review.save( err => {
    if(err){
      throw err;
    }
    return res.status(200)
      .send();
  });
});

router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const user_id = req.body.user_id;
  const guider_id = req.body.guider_id;
  const comment = req.body.comment;
  const grade = req.body.grade;
  const currentTime = new Date();
  
  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400)
      .send({
        error: "INVALID ID",
        code: 1
      });
  }
  Review.findById(_id, (err, review) => {
    if(err) {
      throw err;
    }

    if(!review) {
      return res.status(404)
        .send({
          error: "NO RESOURCE",
          code: 3
        });
    }
    review.user_id = user_id;
    review.guider_id = guider_id;
    review.comment = comment;
    review.grade = grade;
    review.updated = currentTime;
    review.save((err, result) => {
      if(err) {
        throw err;
      }
      return res.status(200)
        .send();
    });
  });
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  
  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400)
      .send({
        error: "INVALID ID",
        code: 1
      });
  }
  Review.findById(_id, (err, review) => {
    if(err) {
      throw err;
    }

    if(!review) {
      return res.status(404)
        .send({
          error: "NO RESOURCE",
          code: 3
        });
    }

    Review.remove({_id: _id}, (err) => {
      if(err) {
        throw err;
      }
      return res.status(200)
        .send();
    });
  });

  res.status(200)
    .send();
});


module.exports = router;
