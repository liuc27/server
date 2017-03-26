import express from 'express';
import Reservation from '../models/reservation';
import mongoose from 'mongoose';
const router = express.Router();

/**
 * @swagger
 * resourcePath: /v1/reservations
 * descrption: All about API
 */

/**
 * @swagger
 * path: /v1/reservations
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
  const credit = req.query.credit;
  const paid = req.query.paid;
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
  if(credit) {
    query.credit = credit;
  }
  if(paid) {
    query.paid = paid;
  }

  let sortClause = {
    "_id": -1
  }

  let limitClause = 50;
  Reservation.find(query)
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
 *   Reservation:
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
  Reservation.findById(_id, (err, result) => {
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
  const time = req.body.time;
  const credit = req.body.credit;
  const paid = req.body.paid;
  const currentTime = new Date();

  const reservation = new Reservation({
    user_id: user_id,
    guider_id: guider_id,
    time: time,
    credit: credit,
    paid: paid,
    created: currentTime,
    updated: currentTime
  });

  reservation.save( err => {
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
  const time = req.body.time;
  const credit = req.body.credit;
  const paid = req.body.paid;
  const currentTime = new Date();
  
  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400)
      .send({
        error: "INVALID ID",
        code: 1
      });
  }
  Reservation.findById(_id, (err, reservation) => {
    if(err) {
      throw err;
    }

    if(!reservation) {
      return res.status(404)
        .send({
          error: "NO RESOURCE",
          code: 3
        });
    }
    reservation.user_id = user_id;
    reservation.guider_id = guider_id;
    reservation.time = time;
    reservation.credit = credit;
    reservation.paid = paid;
    reservation.updated = currentTime;
    reservation.save((err, result) => {
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
  Reservation.findById(_id, (err, reservation) => {
    if(err) {
      throw err;
    }

    if(!reservation) {
      return res.status(404)
        .send({
          error: "NO RESOURCE",
          code: 3
        });
    }

    Reservation.remove({_id: _id}, (err) => {
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

router.post('/api/createOffers', (req, res, next) => {
    ServiceProvider.findOne({
        serviceProviderName: req.body.serviceProviderName
    }, function(err, data) {
        console.log(data)
        if (err) {
            return next(err)
        } else {
            if (data == null) {
                res.send("找不到serviceProvider")
            } else {
                console.log("pushed 1 serviceProvider")
                if (req.body.password === data.password) {
                    console.log("password right")
                    console.log(req.body)

                    req.body.event.forEach((element, index) => {
                        var thisOffer
                        //make sure the creatorName is the sendername
                        if (element.action === "put") {
                            console.log("put")
                            thisOffer = new Offer(element)
                            thisOffer.creatorName = req.body.serviceProviderName
                            thisOffer.save().then(function(result) {
                                res.json({
                                    data: "OK"
                                })
                            }).catch(function(err) {
                                console.error("something went wrong");
                            })
                        }　
                        else if (element.action === "delete") {
                            console.log("delete")
                            console.log(element)
                            Offer.remove({
                                _id: element._id
                            }).then(function(result) {
                                res.json({
                                    data: "OK"
                                })
                            }).catch(function(err) {
                                console.error("something went wrong");
                            })
                        }
                    })
                }
            }
        }
    })
})

router.get('/api/createOffers', (req, res, next) => {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    /* category filter exists */
    if (req.query.serviceProviderName) {
        ServiceProvider.findOne({
            serviceProviderName: req.query.serviceProviderName
        }, function(err, data) {
            if (err) {
                return next(err)
            } else {
                if (data == null) {
                    res.send("did not find serviceProvider")
                } else {
                    if (req.query.password === data.password) {
                        console.log("found serviceProvider and return data")
                        Offer.find({
                            serviceProviderName: {
                                $all: [req.query.serviceProviderName]
                            }
                        }, function(err, data) {
                            console.log(data)
                            res.json(data)
                        })

                    } else {
                        Offer.find({
                            serviceProviderName: {
                                $all: [req.query.serviceProviderName]
                            }
                        }, function(err, data) {
                            console.log(data)
                            res.json(data)
                        })
                    }
                }
            }
        })
    }
})


router.post('/api/acceptOffers', (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, function(err, data) {
        console.log(data)
        if (err) {
            return next(err)
        } else {
            if (data == null) {
                res.send("cant find username")
            } else {
                console.log("pushed 1 username")
                if (req.body.password === data.password) {
                    console.log("password right")
                    console.log(req.body)

                    req.body.event.forEach((element, index) => {
                        //make sure the creatorName is the sendername
                        if (element.action === "put") {
                            console.log("put")

                            Offer.update({
                                _id: req.body.event._id
                            }, {
                                $push: {
                                    username: req.body.username
                                }
                            })
                        } else if (element.action === "delete") {
                            console.log("delete")
                            Offer.update({
                                _id: req.body.event._id
                            }, {
                                $pull: {
                                    username: req.body.username
                                }
                            })
                        }
                    })
                }
            }
        }
    })
})

module.exports = router;
