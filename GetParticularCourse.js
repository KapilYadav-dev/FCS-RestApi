const request = require('request')
const cheerio = require('cheerio')
var baseurl="https://freecoursesite.us/"

function doWork(req,res){
    var url =req.params[0]
    request(url,async (error,response,html)=>{
        if(error) return error
        var $=cheerio.load(html)
        var title=$('.entry-content h1').text() || $('.entry-content h2').text()
        var image=$('.herald-post-thumbnail img').attr('src') 
        var description=$('.js-simple-collapse-inner').find('p').map(function() {
            return $(this).text();
          }).get();
        var learn_overview=$('.what-you-get__content p').text() || $('.entry-content').find('p').text()
        var learn_points = $('.what-you-get__items').find('span').map(function() {
            return $(this).text();
          }).get();
        var requirments = $('.requirements__list').find('li').map(function() {
            return $(this).text();
          }).get();
        var audience_req = $('.audience__list').find('li').map(function() {
            return $(this).text();
          }).get();
        var downloadLink=$('.mks_button').attr('href')
        var data={
            "title":title,
            "image":image,
            "description":description,
            "learn_overview":learn_overview,
            "what_we_learn":learn_points,
            "requirements":requirments,
            "audience_requirement":audience_req,
            "download_link":downloadLink
        }
        res.send(data)
    })
}
module.exports.doWork=doWork