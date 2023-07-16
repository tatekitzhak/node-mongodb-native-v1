'use strict'; // eslint-disable-line strict
var path = require('path');
const url = require('url');
const querystring = require('querystring');

const DIR = path.dirname(__filename)

const { readWriteFilesLocalDirectory } = require('../../services/read_write_files_local_directory');
const dbQuery = require('../../db/query.js');

const readWriteFiles = (args) => {

    return async (req, res, next) => {

        const url_path = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

        const parse_url_path = url.parse(url_path);
        
        let parsedQs = querystring.parse(parse_url_path.query);
        
        async function getContent(content) {

            if (!content.length) {
                console.log('Missing categories data')
                throw new Error('Missing categories data');
            }

            await dbQuery.add(parsedQs.db, parsedQs.coll, content)

            if (content.length) {
                res.status(200).json([ [ parsedQs ], content ]);
            } else {
                res.status(400).json('Empty');
            }

        }
        await readWriteFilesLocalDirectory(parsedQs.folder, parsedQs.output, getContent)

    }



};

module.exports = { readWriteFiles };