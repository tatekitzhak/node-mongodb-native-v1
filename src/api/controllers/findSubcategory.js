'use strict'; // eslint-disable-line strict
var path = require('path');
const url = require('url');
const querystring = require('querystring');

const DIR = path.dirname(__filename)

// const dbQuery = require('../../db/query.js');

exports.findSubcategory = (role) => {
    return (req, res, next) => {

        const url_path = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

        const parse_url_path = url.parse(url_path);

        let parsed_qs = querystring.parse(parse_url_path.query);

        // await dbQuery.add(parsedQs.db, parsedQs.coll, content)

        console.debug('exports.findSubcategory:', parsed_qs, role)
        req.request_data = parsed_qs
        next();
        return;
    }
};