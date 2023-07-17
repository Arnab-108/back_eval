const mongoose = require("mongoose")
const {Schema} = require("mongoose")
const taskSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String},
    status:{type:String},
    board:{type:Schema.Types.ObjectId, ref: 'board'},
},{
    versionKey:false
})

const taskModel = mongoose.model("tasks",taskSchema)

module.exports = {taskModel}