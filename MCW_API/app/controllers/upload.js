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


// Sélection d'un item via son id
exports.getImage = function(req, res) {

    //test des droits
    /*if (typeof req.user.droit != 'number' || req.user.droit > 0) {
     logger.info('Droits insufisants : ' + req.user.login );
     res.send(403);
     return;
     }*/

    var options = {
        root: global.appRoot + "/app/upload/clubs/",
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

   var imagePath = req.params.club_id +"/"+ req.params.image_id;

   res.sendfile(imagePath, options, function(err){
        if (err) {
           console.log(err);
           res.status(err.status).end();
       }
        else {
           console.log('Sent image:', imagePath);
       }
    });



};
