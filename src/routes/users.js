import express from 'express';
import User from '../models/user';
import mongoose from 'mongoose';
const router = express.Router();

/**
 * @swagger
 * resourcePath: /v1/users
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
  const id = req.query.id;
  const nickname = req.query.nickname;
  const country = req.query.country;
  const contact = req.query.contact;
  const language = req.query.language;
  const sex = req.query.sex;
  const age = req.query.age;
  const sort = req.query.sort;
  const skip = req.query.skip;
  const limit = req.query.limit;

  let query = {};
  if(id) {
    query.id = id;
  }
  if(nickname) {
    query.nickname = nickname;
  }
  if(country) {
    query.country = country;
  }
  if(contact) {
    query.contact = {
      "$in": contact
    };
  }
  if(language) {
    query.language = {
      "$in": language 
    };
  }
  if(sex) {
    query.sex = sex;
  }
  if(age) {
    query.age = {
      "$gt": age[0], "$lt": age[1]
    };
  }

  let sortClause = {
    "_id": -1
  }

  let limitClause = 50;
  User.find(query)
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
 *   User:
 *     id: User
 *     properties:
 *       username:
 *         type: String
 *       password:
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
  User.findById(_id, (err, result) => {
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
  const id = req.body.id;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const country = req.body.country;
  const contact = req.body.contact;
  const language = req.body.language;
  const sex = req.body.sex;
  const age = req.body.age;
  const currentTime = new Date();

  const user = new User({
    id: id,
    password: password,
    nickname: nickname,
    country: country,
    contact: contact,
    language: language,
    sex: sex,
    age: age,
    created: currentTime,
    updated: currentTime
  });

  user.save( err => {
    if(err){
      throw err;
    }
    return res.status(200)
      .send();
  });
});

router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const id = req.body.id;
  const nickname = req.body.nickname;
  const country = req.body.country;
  const contact = req.body.contact;
  const language = req.body.language;
  const sex = req.body.sex;
  const age = req.body.age;
  const currentTime = new Date();
  
  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400)
      .send({
        error: "INVALID ID",
        code: 1
      });
  }
  User.findById(_id, (err, user) => {
    if(err) {
      throw err;
    }

    if(!user) {
      return res.status(404)
        .send({
          error: "NO RESOURCE",
          code: 3
        });
    }
    user.id = id;
    user.nickname = nickname;
    user.country = country;
    user.contact = contact;
    user.language = language;
    user.sex = sex;
    user.age = age;
    user.updated = currentTime;
    user.save((err, result) => {
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
  User.findById(_id, (err, user) => {
    if(err) {
      throw err;
    }

    if(!user) {
      return res.status(404)
        .send({
          error: "NO RESOURCE",
          code: 3
        });
    }

    User.remove({_id: _id}, (err) => {
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
