### moodle-scraper

Very simple Moodle Scraper, tested only with UTFPR-CP Moodle. More API very soon.

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
* `user` User credentials and Moodle Domain.
* `callback(err, courses)` Courses JSON or error.

```javascript
moodle.courses(user, function(err, courses){
   if (err) throw err;
   console.log(courses);
})
```

#### teacher(user, teacher, callback)
* `user` User credentials and Moodle Domain.
* `teacher` Moodle teacher ID.
* `callback(err, courses)` Teacher information or error.

```javascript
moodle.teacher(user, teacherId, function(err, teacher){
   if (err) throw err;
   console.log(teacher)
})
```
