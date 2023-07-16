'use strict'; // eslint-disable-line strict
const path = require('path'),
  fs = require('fs');

const { readingContentsOfDirectory } = require('./readContentsOfDirectory');



const readWriteFilesLocalDirectory = (resources_directory, output_file, cb) => {

  const READABLE_RESOURCES = path.join(__dirname, `../../static/${resources_directory}/`),
  NEW_WRITABLE_JSON_FILE = path.join(__dirname, `../../static/${output_file}.json`);

  function getContentOfArrayAndWriteFile(content) {

    fs.writeFile(NEW_WRITABLE_JSON_FILE, JSON.stringify(content), 'utf8', function (error) {
      if (error) {
        console.log("An error occured while writing JSON Object to File:\n", error);
        throw new Error(error.message);
      }
    });
    
    cb(content)
  }
  readingContentsOfDirectory(READABLE_RESOURCES, getContentOfArrayAndWriteFile);
};

module.exports = { readWriteFilesLocalDirectory };