var db = require('../db')
var Schema = {

    creatorName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creatorImageURL:{
        type: String,
        required: true
    },
    creatorTitle:{
        type: String,
        required: false
    },
    creatorIntroduction:{
        type:String,
        required:true
    },
    creatorLevel:{
        type:String,
        required:false
    },
    isStudentOf:[String],
    isPreStudentOf:[String],
    isTeacherOf:[String],
    isPreTeacherOf:[String],
    likedBy: [String],
    comment:[],
    product:[],
    preProduct:[]
}

var creator = db.model('creator', Schema)

module.exports = creator
