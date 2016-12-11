var db = require('../db')
var Product = db.model('Product', {
    id:{
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    productLevel:{
        type:String,
        required:false
    },
    category: {
        type: String,
        required: true
    },
    creatorName: {
        type: String,
        required: true
    },
    creatorImageURL:{
        type: String,
        required: true
    },
    // creatorIntroduction:{
    //     type:String,
    //     required:true
    // },




    time:{
        type: String,
        required: false
    },

    quantity:{
        type: Number,
        required:false
    },
    score:{
        type:String,
        required:false
    },
    productName:{
        type:String,
        required:false
    },
    introduction: {
        type: String,
        required: false
    },

    link: {
        type: String,
        required: false
    },
    list: {
        type: String,
        required: false
    },
    retail: {
        type: String,
        required: false
    },
    // pricing:{
    //     CN: {
    //         list: {
    //             type: String,
    //             required: false
    //         },
    //         retail: {
    //             type: String,
    //             required: false
    //         },
    //         percentageSaving: {
    //             type: String,
    //             required: false
    //         }
    //     },
    //     JP: {
    //         list: {
    //             type: String,
    //             required: false
    //         },
    //         retail: {
    //             type: String,
    //             required: false
    //         },
    //         percentageSaving:{
    //             type: String,
    //             required: false
    //         }
    //     },
    //     US: {
    //         list: {
    //             type: String,
    //             required: false
    //         },
    //         retail: {
    //             type: String,
    //             required: false
    //         },
    //         percentageSaving:{
    //             type: String,
    //             required: false
    //         }
    //     }
    // },

    // cosmetic:{
    //     origin:{
    //         face:{
    //             type: String,
    //             required: false
    //         },
    //         eye:{
    //             type: String,
    //             required: false
    //         },
    //         nose:{
    //             type: String,
    //             required: false
    //         },
    //         mouth:{
    //             type: String,
    //             required: false
    //         },
    //         hair:{
    //             type: String,
    //             required: false
    //         },
    //         eyebrow:{
    //             type: String,
    //             required: false
    //         }
    //     },
    //     replacement:{
    //         face:{
    //             type: String,
    //             required: false
    //         },
    //         eye:{
    //             type: String,
    //             required: false
    //         },
    //         nose:{
    //             type: String,
    //             required: false
    //         },
    //         mouth:{
    //             type: String,
    //             required: false
    //         },
    //         hair:{
    //             type: String,
    //             required: false
    //         }
    //     }
    // },

    face:{
        type: String,
        required: false
    },
    eye:{
        type: String,
        required: false
    },
    nose:{
        type: String,
        required: false
    },
    mouth:{
        type: String,
        required: false
    },
    hair:{
        type: String,
        required: false
    },
    eyebrow:{
        type: String,
        required: false
    },
    instructor:{
        type: String,
        required: false
    },
    follower: [],
    imageURL: {
        type: String,
        required: true
    },
    faceImageURL: {
        type: String,
        required: true
    },
    faceImagePoints:{
        type: Array,
        required: true
    },
    faceImageHeight:{
        type: String,
        required: true
    },
    faceImageWidth:{
        type: String,
        required: true
    },
    productLikedBy:[String],
    videoURL: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false
    },
    issueTime: {
        type: String,
        required: false
    },
    comment : [],
    likedBy:[String]

})

module.exports = Product