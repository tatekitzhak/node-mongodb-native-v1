'use strict'; // eslint-disable-line strict
const express = require('express');
const { getCategory } = require('../controllers/category');

const { readFilesFromAWSS3 } = require('../controllers/aws');
const { readWriteFiles } = require('../controllers/readWriteFiles');
const { add } = require('../../db/queryOperation.js')


const Router = express.Router();

function middleware(req, res, next) {
    console.log(`middleware from baseUrl: ${req.url}`);
    next();
}

Router.route('/')
    .get(middleware, getCategory);

Router.route('/topics')
    .get(middleware, (req, res, next) => {
        res.json({ topics: req.url })

    })
    .post((req, res) => {
        let data = req.body;
        console.log(data)
        // res.json(req.body)
        res.send('Data Received: ' + JSON.stringify(data));
    });

// Using req.query with URL Parameters
// http://localhost:8002/api/topics/user?id=4&token=sdfa3&geo=us
Router.route('/topics/user')
    .get(middleware, (req, res, next) => {

        const user_id = req.query.id;
        const token = req.query.token;
        const geo = req.query.geo;

        res.json({
            topics_url: req.url,
            tagId_is: req.params.tagId,
            user_id: user_id,
            token: token,
            geo: geo
        })

    })


// Router.route('/aws')
//     .get(middleware,
//         readFilesFromAWSS3
//     ).post();

Router.route('/process-files')
    .get(middleware, readWriteFiles)

Router.route('/add-to-database')
    .get(middleware,
        add, 
        (req, res, next) => {
            res.json({ database: req.url })
    
        });

module.exports = {
    Router
};