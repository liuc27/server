var db = require('../db')
var userSchema = {
    userType:{
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    introduction:{
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: false
    },
    likedCreator: [String],
    likedProduct: [String],
    certificate:{
        type: String,
        required: false
    },
    product:[String],
    preProduct: [String],
    comment:[]
}

var user = db.model('user', userSchema)

module.exports = user
