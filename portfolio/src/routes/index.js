var express = require('express');
var mongo   = require('mongodb')
var fs      = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var Moment = require('moment');
var bibtexParse = require('bibtex-parse-js');
var request = require('request');
var async = require('async');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Michael Winter' });
});

/* GET cv. */
router.get('/cv', function(req, res, next) {

  var css = fs.readFileSync( path.join(__dirname, '../public/stylesheets/resume_style.css'), 'utf8');
  var pubdata = fs.readFileSync( path.join(__dirname, '../public/bibtex/bibtex_cv.bib'), 'utf8');
  var db = req.db;

  db.collection('resume').find().toArray(function (err, items) {
    var pubs = bibtexParse.toJSON(pubdata);
    var dict = items[0]
    dict.publications = pubs;
    db.collection('talks').aggregate(
      [
        {'$sort' : {'date' : -1}},
        {'$group': {_id: { $substr: ['$date',0,4] }, talks: { $push: "$$ROOT" }}},
        {'$sort' : {'_id' : -1}}
      ]).toArray(function (err, talks) {
        dict.talks = talks;
        res.render('cv.template', {resume: dict, css: css});
      });
    });
  });

/* GET works_list. */
router.get('/works_list', function(req, res, next) {

  var css = fs.readFileSync( path.join(__dirname, '../public/stylesheets/resume_style.css'), 'utf8');
  var db = req.db;

  db.collection('resume').find().toArray(function (err, items) {
    var dict = items[0];

    db.collection('works').find({}, function(err, works) {

      function removeDuplicates(originalArray, objKey) {

        if (originalArray.length == 1) {
          return originalArray;
        }

        var trimmedArray = [];
        var values = [];
        var value;

        for(var i = 0; i < originalArray.length; i++) {
          value = originalArray[i][objKey];

          if(values.map(Number).indexOf(+value) === -1) {
            trimmedArray.push(originalArray[i]);
            values.push(value);
          }
        }

        trimmedArray.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.start_date) - new Date(a.start_date);
        });
        return trimmedArray
      }

      function processWork(err, work) {

        if(work === null) {
          db.collection('works').aggregate(
            [
              {'$sort' : {'date' : -1}},
              {'$group': {_id: { $year: "$date" }, works: { $push: "$$ROOT" }}},
              {'$sort' : {'_id' : -1}}]).toArray(function (err, worksCV) {
                dict.works = worksCV;
                res.render('workslist.template', {resume: dict, css: css});
                db.collection('works').update({}, {$unset: {'events':1}}, {multi: true});
              });
          return; // All done!
        }

        var titleToSearch = work.title;
        //the abstract will need to be handled better eventually
        //the rule: abstract = total intersection in performance; redux = the non-redux version includes the redux version but not vice-versa
        if( titleToSearch === 'minor third' ){
          titleToSearch = '**********';
        }
        if( titleToSearch === 'seams' ){
          titleToSearch = '**********';
        }
        if( titleToSearch === 'minor third abstract' ){
          titleToSearch = 'minor third'
        }
        if( titleToSearch === 'to walk and ponder (abstract)' ){
          titleToSearch = 'to walk and ponder'
        }
        if( titleToSearch === 'to converge (abstract)' ){
          titleToSearch = 'to converge'
        }
        if( titleToSearch === 'pedal, triangle machine, and (perhaps) coda (abstract)' ){
          titleToSearch = 'pedal, triangle machine, and (perhaps) coda'
        }
        /*
        if( titleToSearch === 'Approximating Omega (redux)' ){
          titleToSearch = 'Approximating Omega';
        }
        */
        if( titleToSearch == 'economy study (in one dimension)' ){
          titleToSearch = 'economy study';
        }
        if( titleToSearch == '[___south america___] miscellany' ){
          titleToSearch = 'miscellany';
        }
        if( (titleToSearch.indexOf('one') !== -1) && (titleToSearch.indexOf('two') !== -1)){
          titleToSearch = 'two';
        }
        // bug: why is mercado san juan or first not updating?
        db.collection('events').find( { $text: { $search: "\"" + titleToSearch + "\"" } } ).toArray(function (err, events1) {
          db.collection('events').find( { 'program' : { "$elemMatch" : { 'work' : { $regex : titleToSearch.replace('(','\\(').replace(')','\\)'), $options : 'i' } } } } ).toArray(function (err, events2) {
            if( titleToSearch !== '**********'){
              db.collection('works').update({ 'title' : work.title }, { $set: { "events": removeDuplicates(events1.concat(events2), 'start_date') } });
            }
            works.next(processWork);
          });
        });
      };
    works.next(processWork);
    });
  });
});

//handle code releases
router.get('/code_releases/*.zip', function(req, res) {
  var db = req.db;
  var splitreq = req.url.split('/');
  var filename = splitreq.pop();
  var bucketName = splitreq.pop();

  db.collection(bucketName + ".files").findOne({ filename: filename  }, function (err, file) {

    if (err) return res.status(400).send(err);
    if (!file) return res.status(404).send('');
    console.log(file.redirect);
    res.redirect(file.redirect);
  });
});

/* redirect catch */
router.get('/redirect=*', function(req, res, next) {
  var link = req.url.split('=').pop();
  request(link).pipe(res);
});


router.get('/*/*', function(req, res) {
  var db = req.db;
  var splitreq = req.url.split('/');
  var filename = splitreq.pop();
  var bucketName = splitreq.pop();

  db.collection(bucketName + ".files").findOne({ filename: filename  }, function (err, file) {
    if (err) return res.status(400).send(err);
    if (!file) return res.status(404).send('');

    var bucket = new mongo.GridFSBucket(db, {
      chunkSizeBytes: 1024,
      bucketName: bucketName
    });

    bucket.openDownloadStreamByName(filename).
    pipe(res).
    on('error', function(error) {
      //assert.ifError(error);
      res.end();
    }).
    on('finish', function() {
      console.log('done!');
    });
  });
});

/*
router.get('/album_art/*', function(req, res) {
  res.render('file');
});

router.get('/pubs/*', function(req, res) {
  res.render('file');
});
*/

//legacy file handler
/*
router.get('/*.*', function(req, res) {
  var file = req.url.split('/').pop()
  request("http://legacy.unboundedpress.org/"+file).pipe(res);
});
*/


/* catch all*/
router.get('/*', function(req, res, next) {
  res.render('index', { title: 'Michael Winter' });
});


Handlebars.registerHelper("prettifyDayDate", function(resumeDate) {
  if (!resumeDate) {
    return 'present';
  }
  var newDate = Moment(resumeDate).format('MM.DD.YYYY');
  //console.log('newDate: ' + newDate);
  return newDate;
});

Handlebars.registerHelper("prettifyMonthDate", function(resumeDate) {
  if (!resumeDate) {
    return 'present';
  }
  var newDate = Moment(resumeDate).format('MMM YYYY');
  //console.log('newDate: ' + newDate);
  return newDate;
});

Handlebars.registerHelper("prettifyYearDate", function(resumeDate) {
  if (!resumeDate) {
    return 'present';
  }
  var newDate = Moment(resumeDate).format('YYYY');
  //console.log('newDate: ' + newDate);
  return newDate;
});

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

Handlebars.registerHelper('toArray', function(val) {
  if (typeof val === 'string') {
    return [val]
  } else {
    return val
  }
});

Handlebars.registerHelper('unless_blank', function(item, block) {
  return (item && item.replace(/\s/g,"").length) ? block.fn(this) : block.inverse(this);
});

Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
  if (arguments.length < 3)
  throw new Error("Handlebars Helper equal needs 2 parameters");
  if( lvalue!=rvalue ) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

module.exports = router;
