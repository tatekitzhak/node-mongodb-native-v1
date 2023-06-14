var fs = require('fs');
const path = require('path');
const readline = require('readline');
const RegExRemoveUnwantedChar = require('../../utils/regex');

/* -----------guide-----------
  https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
*/
async function readFileLineByLine(filePath) {
    const readableFileStream = fs.createReadStream(filePath); // lets us read the contents of a file ( creates a readable stream to a file).

    var convertedTextsFileIntoArray = [];
    const readable = readline.createInterface({
        input: readableFileStream,
        crlfDelay: Infinity
    });

    for await (const line of readable) {
        try {
            let fileLine = RegExRemoveUnwantedChar.prefix_regex(line);
            fileLine = RegExRemoveUnwantedChar.suffix_regex(fileLine);
            fileLine = RegExRemoveUnwantedChar.str_is_spaces(fileLine);
            // Each line in input.txt will be successively available here as `line`.
            if (fileLine) {
                convertedTextsFileIntoArray.push(fileLine);
            }

        } catch (error) {
            console.log('error:', error);
        };
    };
    return convertedTextsFileIntoArray;

};

/* -----------guide-----------
    https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
*/
function readingContentsOfDirectory(dirname, onFileContent) {

    fs.readdir(dirname, function (error, filenames) {
        let contentTopicsCompleted = [];
        if (error) {
            console.log('The directory name is invalid:\n', error);
            throw new Error(error.message)
        }

        var extension = '.txt';
        var validateFileExtension = filenames.filter(function (file) {
            return file.indexOf(extension) !== -1;
        });

        let filesLength = validateFileExtension.length;
        var data = '';

        validateFileExtension.forEach(function (filename, i) {
            data = readFileLineByLine(dirname + filename)
                .then(function (arrayOfTextsFromFile) {

                    let specificFileSchemaObject = {};

                    let baseFileName = path.parse(filename).name;
                    // match begin of string non alphanumeric characters

                    baseFileName = RegExRemoveUnwantedChar.prefix_regex(baseFileName);

                    //match end of string dots and non alphanumeric characters
                    baseFileName = RegExRemoveUnwantedChar.suffix_regex(baseFileName);

                    specificFileSchemaObject['subcategories'] = arrayOfTextsFromFile;
                    specificFileSchemaObject['category'] = baseFileName;
                    contentTopicsCompleted.push(specificFileSchemaObject);

                    if (contentTopicsCompleted.length == filesLength) {
                        onFileContent(contentTopicsCompleted)
                    }
                    return contentTopicsCompleted;
                }).catch((error) => {
                    console.log('Catch statement error has occurred:\n', error);
                    throw new Error(error.message);

                });
        }); // End forEach
/* 
        data.then(function(result) {
            console.log('result:',result) // "Some User token"
         })
          */
    });
}


module.exports = { readingContentsOfDirectory }