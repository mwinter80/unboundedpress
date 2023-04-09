var mongo = require('mongodb');
var db = new mongo.Db('unboundedpress', new mongo.Server("127.0.0.1", 27017), { safe : false });
var Grid = require('gridfs-stream');
var gfs = Grid(db, mongo);
var im = require('imagemagick-stream');

db.open(function(err, db) {
  
  db.authenticate('USER', 'PASS', function(err, result) {

       db.collection('album_art.files').find().forEach(function (file) {
       
            var bucket = 'album_art';
            
            gfs.remove({filename: 'thumb_'+file.filename, root: bucket}, function (err) {
              if (err) return handleError(err);
              console.log('success');
            });

            var rs = gfs.createReadStream({
               _id: file._id,
               root: bucket,
               content_type: file.contextType
            });
            
            var ws = gfs.createWriteStream({
                filename: 'thumb_'+file.filename,
                root: bucket,
                mode: 'w',
                content_type:  file.contentType
            });

            var resize = im().resize('1024x').quality(80);
            rs.pipe(resize).pipe(ws);

      });
      
      db.collection('images.files').find().forEach(function (file) {
       
            var bucket = 'images';
            
            gfs.remove({filename: 'thumb_'+file.filename, root: bucket}, function (err) {
              if (err) return handleError(err);
              console.log('success');
            });

            var rs = gfs.createReadStream({
               _id: file._id,
               root: bucket,
               content_type: file.contextType
            });
            
            var ws = gfs.createWriteStream({
                filename: 'thumb_'+file.filename,
                root: bucket,
                mode: 'w',
                content_type:  file.contentType
            });

            var resize = im().resize('1024x').quality(80);
            rs.pipe(resize).pipe(ws);

      });

  });
  
});




