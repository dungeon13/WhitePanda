const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    vno:{
        type:String
    },
    model:{
        type:String
    },
    capacity:{
        type:String
    },
    rent:{
        type:String
    },
    bookingStatus:{
        type:Number,
        default:0
    },
    spoint:{
        type:String
    }
})
module.exports = mongoose.model("Cars",carSchema);