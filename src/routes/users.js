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

router.post('/api/wechatLogin', (req, res, next) => {
    console.log(req.body)
    var https = require('https');

    var returnData;
    var options1 = {
        host: 'api.weixin.qq.com',
        port: 443,
        path: '/sns/oauth2/access_token?appid=wxf3055e7413a25932&secret=b7da5fcffd98448a2249ee5aecab90e7&code=' + req.body.code + '&grant_type=authorization_code'
    };

    console.log("start")
    var req1 = https.get(options1, function(res1) {
        console.log('STATUS: ' + res1.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res1.headers));

        // Buffer the body entirely for processing as a whole.
        var bodyChunks1 = [];
        res1.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks1.push(chunk);
        }).on('end', function() {
            var body1 = Buffer.concat(bodyChunks1);
            console.log('BODY: ' + body1);
            console.log(body1.toString('utf8'))
            console.log(JSON.parse(body1.toString('utf8')).refresh_token)
            // ...and/or process the entire body here.
            var options2 = {
                host: 'api.weixin.qq.com',
                port: 443,
                path: '/sns/oauth2/refresh_token?appid=wxf3055e7413a25932&grant_type=refresh_token&refresh_token=' + (JSON.parse(body1.toString('utf8'))).refresh_token
            };
            var req2 = https.get(options2, function(res2) {
                console.log('STATUS: ' + res2.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res2.headers));

                // Buffer the body entirely for processing as a whole.
                var bodyChunks2 = [];
                res2.on('data', function(chunk) {
                    // You can process streamed parts here...
                    bodyChunks2.push(chunk);
                }).on('end', function() {
                    var body2 = Buffer.concat(bodyChunks2);

                    var options3 = {
                        host: 'api.weixin.qq.com',
                        port: 443,
                        path: '/sns/userinfo?access_token=' + (JSON.parse(body2.toString('utf8'))).access_token + '&openid=' + (JSON.parse(body2.toString('utf8'))).openid + '&lang=zh_CN'
                    };
                    var req3 = https.get(options3, function(res3) {
                        console.log('STATUS: ' + res3.statusCode);
                        console.log('HEADERS: ' + JSON.stringify(res3.headers));

                        // Buffer the body entirely for processing as a whole.
                        var bodyChunks3 = [];
                        res3.on('data', function(chunk) {
                            // You can process streamed parts here...
                            bodyChunks3.push(chunk);
                        }).on('end', function() {
                            var body3 = Buffer.concat(bodyChunks3);
                            console.log('BODY3: ' + body3);
                            returnData = JSON.parse(body3.toString('utf8'));
                            console.log("send back response")
                            console.log(returnData)

                            var newUser = {};
                            if (returnData.openid) newUser.id = "wechat" + returnData.openid
                            if (returnData.nickname) newUser.nickname = returnData.nickname
                            if (returnData.sex) newUser.sex = returnData.sex
                            if (returnData.launguage) newUser.launguage = returnData.launguage
                            if (returnData.city) newUser.city = returnData.city
                            if (returnData.province) newUser.province = returnData.province
                            if (returnData.country) newUser.country = returnData.country
                            if (returnData.headimgurl) newUser.image = returnData.headimgurl
                            newUser.password = "wechat" + Math.random().toString(36).slice(-8)
                            console.log(newUser)

                            User.update({
                                username: newUser.username
                            }, newUser, {
                                upsert: true
                            }, function(err, data2) {
                                if (err) {
                                    return next(err)
                                } else if (data2) {
                                    console.log("inserted")
                                    res.json(newUser);
                                }
                            })

                        })
                    }).on('error', function(e) {
                        console.log('problem with request: ' + e.message);
                    })
                })
            }).on('error', function(e) {
                console.log('problem with request: ' + e.message);
            })
        })
    }).on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

})


module.exports = router;
