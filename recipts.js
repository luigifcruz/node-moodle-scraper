// Get courses categories.
request('http://ead.cp.utfpr.edu.br/moodle/course/index.php', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    $('div.subcategories')['0'].children.forEach(function(i,e){
      console.log("CATEGORY ID: " + i.attribs['data-categoryid']);
      console.log(i.children[0].children[0].children[0].children[0].data);
    });
  } else {
    console.log("Deu Ruim");
  }
});

// Get courses participants. (Incomplete)
function participants(user, course, callback) {
  // Authenticate user.
  request.post({url: user.url + "/moodle/login/index.php", form: {username: user.username, password: user.password}}, function(err,httpResponse,body){
    if (err) throw err

    // Generate JSON with courses IDs and Names.
    request(user.url + '/moodle/user/index.php?roleid=0&sifirst=&silast=&id=' + course + '&perpage=1000', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('div.no-overflow')['0'].children[0].children.forEach(function(e){
          if (e.name == "tbody") {
            e.children.forEach(function(e){
              e.children.forEach(function(e){
                if (e.attribs.class == "cell c1") {
                  console.log("++++++++++++++++");
                  console.log(e);
                }
              });
            });
          }
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
