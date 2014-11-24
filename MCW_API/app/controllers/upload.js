// Suppression d'un item via son id
exports.upload = function(req, res) {

    var formidable = require('formidable');
    var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./app/img";       //set upload directory
    form.keepExtensions = true;     //keep file extension

    form.parse(req, function(err, fields, files) {
        console.log("uploaded file name: "+JSON.stringify(files.name));
        res.json({ message: 'OK' });
    });

};
