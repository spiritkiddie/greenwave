module.exports.checkFileType = function(file, callback) {
    let extention = file.originalname.split('.').pop();
    let fileType = /jpeg|jpg|png|pdf/;
    let extName = fileType.test(extention.toLowerCase());
    let mimeType = fileType.test(file.mimeType);

    if ( extName || mimeType  ) {
        return callback(null, true);
    } else {
        return callback('Please! Upload Only Images with ( .jpeg, .jpg, .png , .pdf)');
    }
}