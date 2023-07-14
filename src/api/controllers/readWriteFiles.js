'use strict'; // eslint-disable-line strict
var path = require('path');

const DIR = path.dirname(__filename)
console.log('DIR:', DIR)
const { readWriteFilesLocalDirectory } = require('../../services/read_write_files_local_directory');
const dbQuery = require('../../db/query.js');

const readWriteFiles = (req, res, next) => {
    

    async function getContent(content) {
        if (!content.length) {
            console.log('Missing categories data')
            throw new Error('Missing categories data');
        }

        await dbQuery.add('convertxt','category',content)

        if (content.length) {
            res.status(200).json(content);
        } else {
            res.status(400).json('Empty');
        }
        
    }
    readWriteFilesLocalDirectory(getContent)  
};

module.exports = { readWriteFiles };