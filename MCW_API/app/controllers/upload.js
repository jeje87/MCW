var Tools = require('../utils/tools');
var Club = require('../models/club');

exports.upload = function(req, res) {

    var club_id=req.params.club_id;

    Tools.ensureExists("./app/upload/clubs/"+club_id,function(err) {
        if (err)
            res.send(err);// handle folder creation error
        else
            var formidable = require('formidable');
            var form = new formidable.IncomingForm();
            //Formidable uploads to operating systems tmp dir by default
            form.uploadDir = "./app/upload/clubs/"+club_id;       //set upload directory
            form.keepExtensions = true;     //keep file extension

            form.parse(req, function(err, fields, files) {
                console.log("uploaded file name: "+JSON.stringify(files)+" - club_id : " + club_id);

                   Club.findByIdAndUpdate(
                    club_id,
                    {$push: {"images": {path: files.file.path, date: new Date()}}},
                    {safe: true, upsert: true},
                    function(err, model) {
                        if (err)
                            res.send(err);
                        else
                            res.json({ message: 'OK' });
                    }
                );


            });// we're all good
    });

};
