const express = require('express')
const app=express()
var port=process.env.PORT||8080
const GetCoursesList=require('../FCS-RestApi/GetCourseList')
const GetParticularCourse=require('../FCS-RestApi/GetParticularCourse')
app.get('/',(req,res)=>{
    res.json({"get all courses list":"/all-courses/{pageNumber}",
              "get courses by category":"/courses/{category}/{pageNumber}",
              "get details of a single course":"/get-course/{url}"
})
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
app.get('/get-course/*',(req,res)=>{
   GetParticularCourse.doWork(req,res)
 })

app.listen(port,()=>{
    console.log("Server running on port "+port)
})