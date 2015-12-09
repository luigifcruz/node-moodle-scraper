### moodle-scraper

Very simple Moodle Scraper, tested only with UTFPR-CP Moodle. More APIs very soon.

### Installation

    npm install moodle-scraper

### Usage

```javascript
var moodle = require('moodle-scraper');

var user = {
  username: "",
  password: "",
  url: "http://ead.cp.utfpr.edu.br" // Moodle domain.
};

moodle.courses(user, function(err, courses){
   if (err) throw err; // Crash if returns some error.
   console.log(courses) // Show JSON with all user courses.
})
```

### API

#### courses(user, callback)
* `url` User credencials and Moodle Domain.
* `callback(err, couses)` Courses JSON or error.
