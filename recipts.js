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
