const express = require('express')
const app=express()
var port=process.env.PORT||8080
const GetCoursesList=require('../FCS-RestApi/GetCourseList')
app.get('/',(req,res)=>{
    res.send("Welcome")
})
//For all post
app.get('/all-courses/:pageNumber',(req,res)=>{
    GetCoursesList.doWork(req,res)
})
//For all post with categories
app.get('/courses/:category/:pageNumber',(req,res)=>{
    GetCoursesList.doWork(req,res)
 })
 //For a particular post
app.get('/courses/:category/:pageNumber',(req,res)=>{
   
 })

app.listen(port,()=>{
    console.log("Server running on port "+port)
})