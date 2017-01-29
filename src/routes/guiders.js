import express from 'express';
import Guider from '../models/guider';
import mongoose from 'mongoose';
const router = express.Router();

/**
 * @swagger
 * resourcePath: /v1/guiders
 * descrption: All about API
 */

/**
 * @swagger
 * path: /v1/guiders
 * operations:
 *   -  httpMethod: GET
 *      summary: Login with name and password
 *      notes: Returns a guider based on nickname
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
router.get("/", (req, res) => {
  const id = req.query.id;
  const nickname = req.query.nickname;
  const country = req.query.country;
  const contact = req.query.contact;
  const language = req.query.language;
  const sex = req.query.sex;
  const age = req.query.age;
  const occupation = req.query.occupation;
  const pay = req.query.pay;
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
  if(occupation) {
    query.occupation = occupation;
  }
  if(pay) {
    query.pay = {
      "$gt": pay[0], "$lt": pay[1]
    };
  }

  let sortClause = {
    "_id": -1
  }

  let limitClause = 50;
  Guider.find(query)
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
 *   Guider:
 *     id: Guider
 *     properties:
 *       id:
 *         type: String
 *       password:
 *         type: String
 **/
router.get("/:id", (req, res) => {
  res.status(404)
    .send();
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
  const image = req.body.image;
  const occupation = req.body.occupation;
  const pay = req.body.pay;
  const currentTime = new Date();

  const guider = new Guider({
    id: id,
    password: password,
    nickname: nickname,
    country: country,
    contact: contact,
    language: language,
    sex: sex,
    age: age,
    image: image,
    occupation: occupation,
    pay: pay,
    created: currentTime,
    updated: currentTime
  });

  guider.save( err => {
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
  const image = req.body.image;
  const occupation = req.body.occupation;
  const pay = req.body.pay;
  const currentTime = new Date();
  
  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400)
      .send({
        error: "INVALID ID",
        code: 1
      });
  }
  Guider.findById(_id, (err, guider) => {
    if(err) {
      throw err;
    }

    if(!guider) {
      return res.status(404)
        .send({
          error: "NO RESOURCE",
          code: 3
        });
    }
    guider.id = id;
    guider.nickname = nickname;
    guider.country = country;
    guider.contact = contact;
    guider.language = language;
    guider.sex = sex;
    guider.age = age;
    guider.image = image;
    guider.occupatoin = occupation;
    guider.pay = pay;
    guider.updated = currentTime;
    guider.save((err, result) => {
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
  Guider.findById(_id, (err, guider) => {
    if(err) {
      throw err;
    }

    if(!guider) {
      return res.status(404)
        .send({
          error: "NO RESOURCE",
          code: 3
        });
    }

    Gudier.remove({_id: _id}, (err) => {
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
