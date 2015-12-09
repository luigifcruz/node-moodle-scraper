'use strict';

var request = require('request'),
cheerio = require('cheerio');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
request = request.defaults({jar: true});

function courses(user, callback) {
  // Authenticate user.
  request.post({url: user.url + "/moodle/login/index.php", form: {username: user.username, password: user.password}}, function(err,httpResponse,body){
    if (err) throw err

    // Generate JSON with courses IDs and Names.
    request(user.url + '/moodle/my/', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var courses = [];

        $('div.course_list')['0'].children.forEach(function(e){
          var courseId = e.attribs.id.split("-");
          e.children.forEach(function(e){
            if (e.attribs.class == 'course_title') {
              var course = {
                id: courseId[1],
                name: e.children[0].children[0].attribs.title
              };
              courses.push(course);
            }
          });
        });
        process.nextTick(function(){
           callback(null, courses);
        });
      } else {
        process.nextTick(function(){
           callback(new Error(error), null);
        });
        return;
      }
    });
  });
}

module.exports = {
  courses: courses
};
