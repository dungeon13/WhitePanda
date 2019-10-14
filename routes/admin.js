// add the information for the different cars
const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const methodOverride = require("method-override");
const Car = require("../models/car")
const middleWare = require("./middleware")
const User = require("../models/user")
// add the car
router.post("/add",middleWare.isLoggedIn,(req,res)=>{
    var id = req.user._id
    User.findById(id,(err,user)=>{
        if(err){
            res.send({
                message:"error"
            })
        }
        else if(user.admin){
            Car.create(req.body,(err,car)=>{
                if(err){
                res.send(err)
            }
            else{
                res.status(200).send(car)
                }
            })
        }
        else{
            res.send({
                message:"Not Allowed"
            })
        }
    })
    
    
})
// upddate car
router.post("/update",middleWare.isLoggedIn,(req,res)=>{
    var id = req.user._id
    User.findById(id,(err,user)=>{
        if(err){
            res.send({
                message:"error"
            })
        }
        else if(user.admin){
            var vno = req.body.vno
            var rent = req.body.rent
            var spoint = req.body.spoint
            Car.findOneAndUpdate({vno:vno},{rent:rent,spoint:spoint},(err,car)=>{
                res.status(200).send(car)
            })
        }
        else{
            res.send({
                message:"Not Allowed"
            })
        }
    })
    
}) 
// delete car 
router.post("/delete",middleWare.isLoggedIn,(req,res)=>{
    var id = req.user._id
    User.findById(id,(err,user)=>{
        if(err){
            res.status(500).send({
                message:"error"
            })
        }
        else if(user.admin){
            Car.findOneAndRemove({vno:req.body.vno,bookingStatus:0},(err,response)=>{
                if(err){
                    res.status(500).send({
                        message:"error"
                    })
                }
                else{
                    console.log(response)
                    res.send({
                        message:"deleted"
                    })
                }
            })
        }
        else{
            res.send({
                message:"Not Allowed"
            })
        }
    })
})
router.get("/",(req,res)=>{
    res.send({
        "message":"Admin"
    })
});
module.exports = router;