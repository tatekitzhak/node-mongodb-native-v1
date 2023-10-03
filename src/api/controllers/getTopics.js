'use strict'; // eslint-disable-line strict
const { findTopics } = require('../../db/crud_operations/queryOperation');
var path = require('path');
const url = require('url');
const querystring = require('querystring');

const DIR = path.dirname(__filename)

// const dbQuery = require('../../db/query.js');

exports.findTopicsBySubcategoryId = (info) => {
    return async (req, res, next) => {

        const url_path = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

        const parse_url_path = url.parse(url_path);

        let category_subcategory_info = querystring.parse(parse_url_path.query);

        const abc = await findTopics(category_subcategory_info);

        console.debug('exports.getTopics:', category_subcategory_info, abc)
        req.request_data = {
            'topics': 'topics data',
            'query_params':category_subcategory_info
        }
        next();
        return;
    }
};