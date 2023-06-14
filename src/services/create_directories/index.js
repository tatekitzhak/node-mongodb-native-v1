const fs = require('fs');
const path = require('path');
var ROOT_SUBDIR = path.join(__dirname + '../../../static/');

module.exports = {
    createdNewDirectory: (subdirectory) => {

        if (!fs.existsSync(ROOT_SUBDIR + subdirectory)) {
            fs.mkdirSync(ROOT_SUBDIR + subdirectory);
            return 'The directory was created successfully at:';
        }
        else {
            return  "Failed to create directory" ;
        }
    },
    // write the data into a file and save to folder.
    writeDataIntoFile: (stream, subDir, fileName) => {
        new Promise((resolve, reject) => {
            /*
            Flags for fs.createWriteStream(): w - for write. a - for append. r - for
             */
            stream.pipe(fs.createWriteStream(ROOT_SUBDIR + subDir + '/' + fileName, { flags: 'w' }))
                .on('error', err => reject(err))
                .on('close', () => resolve())
        });
    }
};