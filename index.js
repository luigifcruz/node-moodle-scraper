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

function teacher(user, teacher, callback) {
  // Authenticate user.
  request.post({url: user.url + "/moodle/login/index.php", form: {username: user.username, password: user.password}}, function(err,httpResponse,body){
    if (err) throw err

    request(user.url + '/moodle/user/profile.php?id=' + teacher, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);

        var country, city, first_access, last_access;
        $('dl.list')['0'].children.forEach(function(e,i){
          if(e.name == "dt") {
            if (e.children[0].data == "Country") {
              country = e.next.children[0].data;
            } else if (e.children[0].data == "City/town") {
               city = e.next.children[0].data;
            } else if (e.children[0].data == "First access") {
              first_access = e.next.children[0].data;
            } else if (e.children[0].data == "Last access") {
              last_access = e.next.children[0].data;
            }
          }
        });

        var teacherInfo = {
          Picture: $('img.userpicture')['0'].attribs.src,
          Name: $('h2.main')['0'].children[0].data,
          Country: country,
          City: city,
          FirstAccess: first_access,
          LastAccess: last_access
        }
        console.log(teacherInfo);

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
  courses: courses,
  teacher: teacher
};
