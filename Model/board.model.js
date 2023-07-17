const mongoose = require("mongoose")
const {Schema} = require('mongoose');

const boardSchema = mongoose.Schema({
     name: {type:String},
     tasks: [{ type:Schema.Types.ObjectId, ref: 'tasks'}]
},{
    versionKey:false
}) 

const boardModel = mongoose.model("board",boardSchema)

module.exports = {boardModel}

