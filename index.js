const express = require('express')
const app=express()
const request = require('request')
const cheerio = require('cheerio')
var baseurl="https://freecoursesite.us/"
var port=process.env.PORT||8080
var data=[]
var image,category,title,time,views,shortdesc,url
var titlelist=[],imglist=[],urllist=[],categoryList=[],timeList=[],viewsList=[],shortDescList=[]
app.get('/',(req,res)=>{
    res.send("Welcome")
})
//For all post
app.get('/all-courses/:pageNumber',(req,res)=>{
    GetCoursesList(req,res)
})
//For all post with categories
app.get('/courses/:category/:pageNumber',(req,res)=>{
    GetCoursesList(req,res)
 })
 

app.listen(port,()=>{
    console.log("Server running on port "+port)
})
function empty() {
    categoryList=[]
    imglist=[]
    titlelist=[]
    urllist=[]
    timeList=[]
    viewsList=[]
    shortDescList=[]
    data=[]
}

function GetCoursesList(req,res){
    var url 
    if (req.params.category!=null)  url=baseurl+"category/all-courses/"+req.params.category+"/page/"+req.params.pageNumber
    else  url=baseurl+"category/all-courses/page/"+req.params.pageNumber
    console.log(url);
    request(url,async (error,response,html)=>{
        if(error) return error
        var $=cheerio.load(html)
        var card=$('.herald-lay-b')
        card.each(function (i, e) {
            var a=$(this)
             image=a.find('img').attr('src')
             category = a.find('.meta-category').find('a').map(function() {
                return $(this).text();
              }).get();
             title=a.find('h2').text()
             url=a.find('h2 a').attr('href')
             time=a.find('.updated').text()
             views=a.find('.herald-views').text()
             shortdesc=a.find('.entry-content p').text()
             titlelist[i]=title
             imglist[i]=image
             urllist[i]=url
             categoryList[i]=category
             timeList[i]=time
             viewsList[i]=views
             shortDescList[i]=shortdesc
        })
        for(var i=0;i<card.length;i++)
        {
            var object={
                "title": titlelist[i],
                "url": urllist[i],
                "category":categoryList[i],
                "image":imglist[i],
                "shortdesc":shortDescList[i],
                "uploaded":timeList[i],
                "views":viewsList[i]
            }
            data.push(object)
        }
        if(data!=null && data.length>0) res.status(200).json({"pageNumber":req.params.pageNumber,"data":data})
        else if(response.statusCode==500) res.status(500).json({"pageNumber":req.params.pageNumber,"error":"Website is down..."})
        else if(response.statusCode==404) res.status(404).json({"pageNumber":req.params.pageNumber,"error":"Page doesn't exist..."})
        empty()
    })
}
