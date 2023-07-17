const express = require("express")
const {boardModel} = require("../Model/board.model")
const { taskModel } = require("../Model/tasks.model")

const boardRouter = express.Router()
let arr=[]
boardRouter.post("/add",async(req,res)=>{
    try {
        const data = boardModel(req.body)
        arr.shift(data._id)
        await data.save()
        console.log(arr[0])
        res.status(200).send({"msg":"New Board Added!",board:req.body})
    } catch (error) {
        res.status(400).send(error)
    }
})

boardRouter.post("/addtask",async(req,res)=>{
    const board = await boardModel.find()
    console.log(board)
    try {
        const data = taskModel(req.body)
        data.board = board[board.length-1]._id
        await data.save()
        console.log(board[board.length-1])
        const data1 = await boardModel.findById({_id:data.board})
        data1.tasks.push(data)
        await data1.save()
        res.status(200).send({ "msg": "New Task Added!", task: req.body })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

boardRouter.get("/",async(req,res)=>{
    try {
        try {
            const data = await boardModel.find().populate({path:'tasks' , select:'title description status'})
            res.send(data)
        } catch (error) {
            res.send(error)
        }
    } catch (error) {
        
    }
})
module.exports={boardRouter}