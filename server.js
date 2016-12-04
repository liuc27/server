var express = require('express'),
    cors = require('cors'),
    weixin = require('weixin-api'),
    app = express();
Useragent = require('express-useragent');
app.use(cors());
app.use(Useragent.express());
var bodyParser = require('body-parser')
var Product = require('./models/product')
var Creator = require('./models/creator')
var User = require('./models/user')
var jwt = require('jwt-simple')
var _ = require('lodash')
var Limiter = require('express-rate-limiter')
var MemoryStore = require('express-rate-limiter/lib/memoryStore')

var limiterGet = new Limiter({
    db: new MemoryStore()
});
var limiterPost = new Limiter({
    db: new MemoryStore()
});
var limiterPostAll = new Limiter({
    db: new MemoryStore()
});
var limiterUser = new Limiter({
    db: new MemoryStore()
});
var limiterTypes = new Limiter({
    db: new MemoryStore()
});
var limiterAdd = new Limiter({
    db: new MemoryStore()
});
var limiterReplace = new Limiter({
    db: new MemoryStore()
});
var limiterComment = new Limiter({
    db: new MemoryStore()
});
var limiterRegister = new Limiter({
    db: new MemoryStore()
});
var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch')

var fs = require('fs')

var secretKey = 'supersecretkey'

var logger = require('morgan')
var get_ip = require('ipware')().get_ip;

app.use(bodyParser.json({
    limit: '600kb'
}))
app.use(logger('dev'))
app.use('/images/', express.static(__dirname + '/images/'))
app.use('/', express.static(__dirname + '/www/'))
app.use('/shopImages/', express.static(__dirname + '/shopImages/'))
app.use('/shopCertificates/', express.static(__dirname + '/shopCertificates/'))
app.use('/userCertificates/', express.static(__dirname + '/userCertificates/'))

app.use(function(req, res, next) {
    var ip_info = get_ip(req);
    console.log(ip_info);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
})

app.get('/api/product', limiterGet.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    Product.find({}, function(err, product) {
        if (err) {
            return next(err)
        }
        res.json(product)
    })
})

app.get('/api/creators', limiterGet.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    Creator.find(function(err, creators) {
        if (err) {
            return next(err)
        }
        res.json(creators)
    })
})


app.get('/api/user',function (req, res, next) {
    User.find(function (err, data) {
        if (err) {
            return next(err)
        }
        res.json(data)
    })
})

app.get('/api/getMenu',function(req, res,next){

    var data =  [{
      id: 0,
      name: '东京',
      icon: 'ios-wine',
      color: 'red',
      type: 'food'
    }, {
      id: 1,
      name: '京都',
      icon: 'ios-basket',
      color: '#5383FF',
      type: 'shopping'

    }, {
      id: 2,
      name: '大阪',
      icon: 'ios-color-wand',
      color: 'pink',
      type: 'beauty'
    }, {
      id: 3,
      name: '北海道',
      icon: 'ios-moon',
      color: '#5383FF',
      type: 'hotel'
    }, {
      id: 4,
      name: '冲绳',
      icon: 'ios-film',
      color: 'silver',
      type: 'movie'
    }, {
      id: 5,
      name: '箱根',
      icon: 'ios-car',
      color: 'gold',
      type: 'car'
    }, {
      id: 6,
      name: '福冈',
      icon: 'ios-cafe',
      color: 'lightgreen',
      type: 'job'
    }, {
      id: 7,
      name: '奈良',
      icon: 'ios-musical-notes',
      color: 'lightgreen',
      type: 'job'
    }, {
      id: 8,
      name: '名古屋',
      icon: 'md-add',
      color: 'lightgreen',
      type: 'job'
    }, {
      id: 9,
      name: '横滨',
      icon: 'ios-eye',
      color: 'orange',
      type: 'all'
    }]
    res.json(data)
})

//   var data =  [{
//       id: 0,
//       name: 'cute',
//       icon: 'ios-wine',
//       color: 'red',
//       type: 'food'
//     }, {
//       id: 1,
//       name: 'beautiful',
//       icon: 'ios-basket',
//       color: '#5383FF',
//       type: 'shopping'

//     }, {
//       id: 2,
//       name: 'sexy',
//       icon: 'ios-color-wand',
//       color: 'pink',
//       type: 'beauty'
//     }, {
//       id: 3,
//       name: 'elegant',
//       icon: 'ios-moon',
//       color: '#5383FF',
//       type: 'hotel'
//     }, {
//       id: 4,
//       name: 'season',
//       icon: 'ios-film',
//       color: 'silver',
//       type: 'movie'
//     }, {
//       id: 5,
//       name: 'date',
//       icon: 'ios-car',
//       color: 'gold',
//       type: 'car'
//     }, {
//       id: 6,
//       name: 'work',
//       icon: 'ios-cafe',
//       color: 'lightgreen',
//       type: 'job'
//     }, {
//       id: 7,
//       name: 'party',
//       icon: 'ios-musical-notes',
//       color: 'lightgreen',
//       type: 'job'
//     }, {
//       id: 8,
//       name: 'wedding',
//       icon: 'md-add',
//       color: 'lightgreen',
//       type: 'job'
//     }, {
//       id: 9,
//       name: 'All',
//       icon: 'ios-eye',
//       color: 'orange',
//       type: 'all'
//     }]
//     res.json(data)
// })

app.post('/api/findCreator', limiterGet.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    Creator.findOne({creatorName:req.body.creatorName},function(err, creator) {
        if (err) {
            return next(err)
        }
        res.json(creator)
    })
})

app.post('/api/findProduct', limiterGet.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    console.log(req.body.creatorName);
    Product.find({creatorName:req.body.creatorName},function(err, product) {
        if (err) {
            return next(err)
        }
        console.log("product");

        console.log(product);

        res.json(product)
    })
})

app.post('/api/product', limiterReplace.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {

    if(req.body.name) {
        if (!fs.existsSync('./images/')) {
            fs.mkdirSync('./images/');
        }


        Creator.findOne({creatorName:req.body.creatorName},function(err,data) {
            if (err) {
                return next(err)
            } else {
                if (data == null) {
                    res.send("找不到creator")
                } else {
                    if(req.body.password === data.password){

                        if (req.body.productLevel == "pre") {
                            if (data.preProduct != null) {
                                if(data.preProduct.indexOf(req.body.name) < 0)
                                    Creator.update({name: req.body.creatorName}, {$push: {'preProcut': req.body.name}},function(err,data){})
                            } else {
                                Creator.update({name: req.body.creatorName}, {$push: {product: req.body.name}},function(err,data){})
                            }
                        } else {
                            if (data.product != null) {
                                if(data.product.indexOf(req.body.name) < 0){
                                    Creator.update({name: req.body.creatorName}, {$push: {product: req.body.name}},function(err,data){})
                                }
                            } else {
                                Creator.update({name: req.body.creatorName}, {$push: {product: req.body.name}},function(err,data){})
                            }
                        }


                        var imageURL;
                        var faceImageURL;
                        var creatorImageURL;
                        if(req.body.imageURL) {

                            imageURL = "http://localhost:8080/images/" + req.body.name + ".image.jpg";
                            data = req.body.imageURL;
                            req.body.imageURL = imageURL;

                            var base64Data, binaryData;
                            base64Data = data.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "");
                            base64Data += base64Data.replace('+', ' ');
                            binaryData = new Buffer(base64Data, 'base64').toString('binary');


                            fs.writeFile("images/" + req.body.name + ".image.jpg", binaryData, "binary", function (err) {

                                console.log(err); // writes out file without error, but it's not a valid image
                            });
                        }

                        if(req.body.faceImageURL)
                        {
                            faceImageURL = "http://localhost:8080/images/" + req.body.name + ".faceImage.jpg";
                            data = req.body.faceImageURL;
                            req.body.faceImageURL = faceImageURL;

                            var base64Data, binaryData;
                            base64Data = data.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "");
                            base64Data += base64Data.replace('+', ' ');
                            binaryData = new Buffer(base64Data, 'base64').toString('binary');


                            fs.writeFile("images/" + req.body.name + ".faceImage.jpg", binaryData, "binary", function (err) {

                                console.log(err); // writes out file without error, but it's not a valid image
                            });
                        }

                        creatorImageURL = "http://localhost:8080/images/" + req.body.creatorName + ".creatorImage.jpg";
                        req.body.creatorImageURL = creatorImageURL;

                        console.log(req.body)
                        delete req.body.password;
                        console.log(req.body)
                        var duplicateObject =  JSON.parse(JSON.stringify(req.body));


                        Product.update({
                            "name": req.body.name
                        }, duplicateObject, {
                            upsert: true
                        }, function (err, data) {
                            if (err) {
                                return next(err)
                            } else {
                                res.json({"data":"uploaded"})
                            }
                        })
                    } else {
                        res.json({"data":"wrongPassword"})
                    }
                }
            }
        });



    } else{
        res.send("NO");
    }
})


app.post('/api/creatorRegister', limiterGet.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {

    if (req.body.creatorImageURL) {
        var creatorImageURL = "http://localhost:8080/images/" + req.body.creatorName + ".creatorImage.jpg";
        data = req.body.creatorImageURL;
        req.body.creatorImageURL = creatorImageURL;

        var base64Data, binaryData;
        base64Data = data.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "");
        base64Data += base64Data.replace('+', ' ');
        binaryData = new Buffer(base64Data, 'base64').toString('binary');

        if (!fs.existsSync('./images/')) {
            fs.mkdirSync('./images/');
        }

        // if (fs.exists("images/" + req.body.creatorName + ".creatorImage.jpg")) {
        //     fs.unlink("images/" + req.body.creatorName + ".creatorImage.jpg", function (err) {
        //         if (err) throw err;
        //         console.log('successfully deleted ');
        //     });
        // }

        fs.writeFile("images/" + req.body.creatorName + ".creatorImage.jpg", binaryData, "binary", function (err) {
            console.log(err); // writes out file without error, but it's not a valid image
        });
    }

    var duplicateObject = JSON.parse(JSON.stringify(req.body));

    Creator.update({
        "name": req.body.creatorName
    }, duplicateObject, {
        upsert: true
    }, function (err, data) {
        if (err) {
            return next(err)
        } else {
            res.json({ data: "registered" });
        }
    })
})

app.post('/api/login', limiterPost.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    console.log(req.body.username)
    if(req.body.username != undefined && req.body.username!=null && req.body.password != null) {

        User.findOne({"username": req.body.username}, function (err, data) {
            if (err) {
                console.log("err");
                return next(err)
            } else if(data == null) {

                console.log("user name not exist, you can use it: " + req.body.username)
                var token = jwt.encode({
                    username: req.body.username
                }, secretKey)
                console.log(token)

                var objForUpdate = {};

                if (req.body.username) objForUpdate.username = req.body.username;
                if (req.body.password) objForUpdate.password = req.body.password;

                User.update({username:req.body.username},objForUpdate,{upsert:true}, function (err, data2) {
                    if (err) {
                        return next(err)
                    } else if (data2) {
                        console.log("inserted")
                        console.log(data2)
                        res.send(data2)
                    }
                })
            }else {
                if (req.body.password == data.password) {
                    res.json({data:"OK"})
                } else {
                    res.json({data:"NO"})
                }
            }
        })
    }
})

app.post('/api/creatorLogin', limiterPost.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    console.log(req.body.creatorName)
        console.log(req.body.password)

    if(req.body.creatorName != undefined && req.body.creatorName!=null && req.body.password != null) {

        Creator.findOne({"name": req.body.creatorName}, function (err, data) {
            if (err) {
                console.log("err");
                return next(err)
            } else if(data == null) {

                console.log("user name not exist, you can use it: " + req.body.username)

                res.json({data:"notExist"})
            }else {
                if (req.body.password == data.password) {
                    res.json({data:"OK"})
                } else {
                    res.json({data:"NO"})
                }
            }
        })
    }
})

app.post('/api/likeProduct', limiterPost.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    console.log(req.body.username)
    if(req.body.username != undefined && req.body.username!=null && req.body.password != null) {
        User.findOne({"username": req.body.username}, function (err, data) {
            if (err) {
                console.log("err");
                return next(err)
            } else if (req.body.password == data.password) {
                console.log("username exists");
                if (data.likedProduct.indexOf(req.body.name)>=0) {
                    console.log(data)
                    console.log(data.length)

                        User.update({username: req.body.username}, {$pull: {likedProduct: req.body.name}}, function (err, data) {
                                if (err) {
                                    console.log("err");
                                    return next(err)
                                } else {
                                    console.log(data)
                                    Product.update(
                                        {name: req.body.name},
                                        {$pull: {likedBy: req.body.username}}, function (err, data) {
                                            console.log("pull out likedProduct")
                                            if (err) {
                                                console.log("err")
                                                return next(err)
                                            } else {
                                                console.log(data)
                                                res.json({ data: "pull" });

                                            }
                                        }
                                    )
                                }
                            })

                } else {
                    console.log(data.likedProduct.indexOf(req.body.name))
                    User.update({username: req.body.username}, {$addToSet: {likedProduct: req.body.name}}, function (err, data) {
                        if (err) {
                            console.log("err");
                            return next(err)
                        } else {
                            console.log(data)
                            console.log("inserted likedProduct")
                            Product.update(
                                {name: req.body.name},
                                {$addToSet: {likedBy: req.body.username}}, function (err, data) {
                                    if (err) {
                                        console.log("err")
                                        return next(err)
                                    } else {
                                        console.log(data)
                                        res.json({ data: "push" });

                                    }
                                })
                        }
                    })
                }
            }else {
                res.send("Cant find")
            }
        })
    }
})



app.post('/api/likeCreator', limiterPost.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    console.log(req.body.username)
    if(req.body.username != undefined && req.body.username!=null && req.body.password != null) {
        User.findOne({"username": req.body.username}, function (err, data) {
            if (err) {
                console.log("err");
                return next(err)
            } else if (req.body.password == data.password) {
                console.log("username exists");
                if (data.likedCreator.indexOf(req.body.name)>=0) {
                    console.log(data)
                    console.log(data.length)

                    User.update({username: req.body.username}, {$pull: {likedCreator: req.body.name}}, function (err, data) {
                        if (err) {
                            console.log("err");
                            return next(err)
                        } else {
                            console.log(data)
                            Creator.update(
                                {name: req.body.name},
                                {$pull: {likedBy: req.body.username}}, function (err, data) {
                                    console.log("pull out likedCreator")
                                    if (err) {
                                        console.log("err")
                                        return next(err)
                                    } else {
                                        console.log(data)
                                        res.json({ data: "pull" });

                                    }
                                }
                            )
                        }
                    })

                } else {
                    console.log(data.likedCreator.indexOf(req.body.name))
                    User.update({username: req.body.username}, {$addToSet: {likedCreator: req.body.name}}, function (err, data) {
                        if (err) {
                            console.log("err");
                            return next(err)
                        } else {
                            console.log(data)
                            console.log("inserted likedCreator")
                            Creator.update(
                                {name: req.body.name},
                                {$addToSet: {likedBy: req.body.username}}, function (err, data) {
                                    if (err) {
                                        console.log("err")
                                        return next(err)
                                    } else {
                                        console.log(data)
                                        res.json({ data: "push" });

                                    }
                                })
                        }
                    })
                }
            }else {
                res.send("Cant find")
            }
        })
    }
})

// app.post('/api/likeCreator', limiterPost.middleware({
//     innerLimit: 10,
//     outerLimit: 60,
//     headers: false
// }), function(req, res, next) {
//     console.log(req.body.username)
//     if(req.body.username != undefined && req.body.username!=null && req.body.password != null) {
//
//         User.findOne({"username": req.body.username}, function (err, data) {
//             if (err) {
//                 console.log("err");
//                 return next(err)
//             } else if(data == null) {
//
//                 console.log("user name not exist, you can use it: " + req.body.username)
//
//             }else {
//                 if (req.body.password == data.password) {
//
//                     console.log("username exists");
//                     User.update({ username: req.body.username }, { $addToSet: { likedCreator: req.body.name }}, function (err,data) {
//                             if(err){
//                                 console.log("err");
//                                 return next(err)
//                             }else{
//                                 console.log(data)
//                                 Creator.update(
//                                     {name:req.body.name},
//                                     {$addToSet: {likedBy: req.body.username}},function (err,data) {
//                                         if(err){
//                                             console.log("err")
//                                             return next(err)
//                                         }else{
//                                             console.log(data)
//                                             res.send("OK")
//                                         }
//                                     }
//                                 )
//                             }
//                         }
//                     )
//
//
//                 } else {
//                     res.send("NO")
//                 }
//             }
//         })
//     }
// })




app.post('/api/addProductComment', limiterPost.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    console.log(req.body.username)
    if(req.body.username != undefined && req.body.username!=null && req.body.password != null) {

        User.findOne({"username": req.body.username}, function (err, data) {
            if (err) {
                console.log("err");
                return next(err)
            } else if(data == null) {

                console.log("user name not exist, you can use it: " + req.body.username)
                return("NO")
            }else {

                insertCommentData = {
                    discussion_id : req.body.discussion_id,
                    parent_id : req.body.parent_id,
                    posted : req.body.posted,
                    username : req.body.username,
                    text : req.body.text,
                    notice: false,
                    rate : req.body.rate
                }

                if (req.body.password == data.password) {

                    console.log("username exists");
                            if(err){
                                console.log("err");
                                return next(err)
                            }else{
                                console.log(data)
                                Product.update(
                                    {_id:req.body.discussion_id},
                                    {$push: {comment: {
                                        $each: [insertCommentData],
                                        $position: 0
                                    }}},function (err,data) {
                                        if(err){
                                            console.log("err")
                                            return next(err)
                                        }else{
                                            console.log(data)
                                            User.update({ username: req.body.username }, { $push: { comment: {discussion_id:req.body.discussion_id,posted:req.body.posted} }}, function (err,data) {
                                                if (err) {
                                                    console.log("err")
                                                    return next(err)
                                                } else {
                                                    console.log(data)
                                                    res.send("OK")
                                                }
                                            })
                                        }
                                    })
                            }
                } else {
                    res.send("NO")
                }
            }
        })
    }
})


app.post('/api/addShopComment', limiterPost.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    console.log(req.body.username)
    if(req.body.username != undefined && req.body.username!=null && req.body.password != null) {

        User.findOne({"username": req.body.username}, function (err, data) {
            if (err) {
                console.log("err");
                return next(err)
            } else if(data == null) {

                console.log("user name not exist, you can use it: " + req.body.username)
                res.send("NO")
            }else {

                insertCommentData = {
                    discussion_id : req.body.discussion_id,
                    parent_id : req.body.parent_id,
                    posted : req.body.posted,
                    username : req.body.username,
                    text : req.body.text,
                    notice: false,
                    rate : req.body.rate
                }

                if (req.body.password == data.password) {

                    console.log("username exists");
                    if(err){
                        console.log("err");
                        return next(err)
                    }else{
                        console.log(data)
                        Creator.update(
                            {_id:req.body.discussion_id},
                            {$push: {comment: {
                                $each: [insertCommentData],
                                $position: 0
                            }}},function (err,data) {
                                if(err){
                                    console.log("err")
                                    return next(err)
                                }else{
                                    console.log(data)
                                    User.update({ username: req.body.username }, { $push: { comment: {discussion_id:req.body.discussion_id,posted:req.body.posted} }}, function (err,data) {
                                        if (err) {
                                            console.log("err")
                                            return next(err)
                                        } else {
                                            console.log(data)
                                            res.send("OK")
                                        }
                                    })
                                }
                            })
                    }
                } else {
                    res.send("NO")
                }
            }
        })
    }
})


// app.post('/api/login', limiterPost.middleware({
//     innerLimit: 10,
//     outerLimit: 60,
//     headers: false
// }), function(req, res, next) {
//
//     if(req.body.username != null && req.body.password != null) {
//         User.findOne({"username": req.body.username}, function (err, data) {
//             console.log(data);
//             if (err) {
//                 console.log("err");
//                 return next(err)
//             } else {
//                 if (data != null) {
//                     if (req.body.password == data.password) {
//                         res.send("OK")
//                     } else {
//                         res.send("NO")
//                     }
//                 }
//             }
//         })
//     }
// })

app.listen(8080, function() {
    console.log('server listening on', 8080)
})