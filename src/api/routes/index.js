'use strict'; // eslint-disable-line strict
const express = require('express');
var url = require('url');
const { getCategory } = require('../controllers/category');
// const { readFilesFromAWSS3 } = require('../controllers/aws');
const { readWriteFiles } = require('../controllers/readWriteFiles');
const { Query, add } = require('../../db/queryOperation.js')
const DbQuery = require('../../db/query.js');
const subcategoryController = require('../controllers/findSubcategory');


const Router = express.Router();

const middleware = (text) => {
    return (req, res, next) => {
        console.log('middleware:', req.headers.host)
        req.requestInfo = text;
        next();
    };
};

const hasRole = (req, res, next, role) => {
    var url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('Role:', role)
    console.log('URI:', url)
    req.requestInfo = url;
    next();
};

Router.route('/')
    .get(function (req, res, next) {
        hasRole(req, res, next, 'admin');
    },
        (req, res, next) => {
            var url = req.protocol + '://' + req.get('host') + req.originalUrl;

            const parse_url = new URL(url)

            res.status(200).set({ 'status': 'OK' });
            res.json([{
                parse_url: parse_url,
                middlewareInfo: req.requestInfo
            }]);

        });

// Read and Requests Data
Router.route('/category')
    .get(middleware('text'), getCategory);

Router.route('/category/:subcategory')
    .get(
        function (req, res, next) {
            hasRole(req, res, next, 'admin');
        },
        subcategoryController.findSubcategory('admin'),
        (req, res, next) => {
            var url = req.protocol + '://' + req.get('host') + req.originalUrl;

            const parse_url = new URL(url)
            res.json([{
                parse_url: parse_url,
                middlewareInfo: req.requestInfo,
                req_request_data: req.request_data
            }]);
        });

Router.route('/category/:subcategory/:topics')
    .get((req, res, next) => {

        var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;

        const parse_url = new URL(full_url)
        const { href, origin, protocol, username, password, host, hostname, port, pathname, search, searchParams, hash } = parse_url;

        //Print the url object.
        const urlObject = {
            "Href value ": href,
            "Origin value ": origin,
            "Protocol value ": protocol,
            "Username value ": username,
            "Password value ": password,
            "Host value ": host,
            "Hostname value ": hostname,
            "Port value ": port,
            "Pathname value ": pathname,
            "Search value ": search,
            "SearchParams value ": searchParams,
            "Hash value ": hash
        }
        const options = {
            hostname: 'yourapi.com',
            port: 443,
            path: '/todos',
            method: '',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Length': urlObject.length
            }
        }

        res.json([urlObject]);

    });


Router.route('/topics/insert')
    .post(function (req, res, next) {

        // var sql = 'INSERT INTO t_movie (movie_title, movie_rate) VALUES (?, ?)';
        // var body = [req.body.movie_title, req.body.movie_rate];
        // con.query(sql, body, function (err) {
        //     if (err) {
        //         res.json([{ "Error": true, "Message": "SQL Error" }]);
        //     } else {

        //     }
        // });

        res.status(201).set({ 'status': 'Created' });
        res.json([{
            "Error": false,
            "Message": "Success",
            "data": [
                {
                    "movie_name": req.body.movie_title,
                    "rate": req.body.movie_rate
                }
            ]
        }])
    });

//Updated Data into an Existing
Router.route('/topics/update')
    .put(function (req, res, next) {
        var sql = 'UPDATE t_movie SET movie_title = ?, movie_rate = ? WHERE id_movie = "' + req.body.id_movie + '"';
        var body = [req.body.movie_title, req.body.movie_rate];
        con.query(sql, body, function (err) {
            if (err) {
                res.json({ "Error": true, "Message": "Error execute sql" });
            } else {
                res.json({ "Error": false, "Message": "Success" });
            }
        });
    })

// POST -> INSERT PUT 
Router.route('/topics')
    .get(middleware, (req, res, next) => {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        res.status(200).set({ 'status': 'OK' });
        res.json({ topics: fullUrl })

    })
    .post((req, res) => {
        let data = req.body;
        console.log(data)
        // res.json(req.body)
        res.send('Data Received: ' + JSON.stringify(data));
    });

// Using req.query with URL Parameters
// http://localhost:8002/api/topics/user?id=4&token=sdfa3&geo=us
Router.route('/topics/:arg/user')
    .get(middleware, (req, res, next) => {

        const data = {
            'topics_url': req.url,
            'tagId_is': req.params.tagId,
            'user_id': req.query.id,
            'token': req.query.token,
            'geo': req.query.geo
        }

        res.status(200).json(data)

    });



// Router.route('/aws')
//     .get(middleware,
//         readFilesFromAWSS3
//     ).post();

Router.route('/process-files')
    .get(middleware('Build a datatbase with process-files'), readWriteFiles('Build a datatbase, and category and subcategory collections'))
    .post((req, res) => {
        let data = req.body;
        console.log(data)
        // res.json(req.body)
        res.send('Data Received: ' + JSON.stringify(data));
    })

Router.route('/add-to-database')
    .get(middleware,
        Query.add('contxt1', 'abc'),
        (req, res, next) => {
            res.json({ database: req.url })

        });

Router.route('/add-JSON-file-to-db')
    .get(DbQuery.add, async (req, res) => {
        try {
            res.status(200).send({
                message: `Congratulations! You made it. Your role is ${req.role}`
            })
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error'
            })
        }
    })

module.exports = {
    Router
};