class MongoDatabase {

    connect(callBack) {

        const MongoClient = require('mongodb').MongoClient;

        const dbHost = 'localhost';
        const dbUser = 'mongo_db_admin';
        const dbPass = 'EXAMPLE_PASSWORD';
        const dbPort = 27017;
        const dbName = "my_company";

        const conString = "mongodb://" + dbUser + ":" + dbPass + "@" + dbHost + ":" + dbPort;

        MongoClient.connect(conString, function(err, dbClient) {

            if (!err) {
                const mongoDb = dbClient.db(dbName);
                callBack(null, mongoDb);
            }
        });
    }

    insertDocument(data, callBack) {

        this.connect(function (dbErr, mongoDb) {

            if (!dbErr) {

                mongoDb.collection("employees").insertOne(data, function(err, result) {
                    if (err) {
                        callBack(err, null);
                    } else {
                        callBack(null, result);
                    }
                });
            }
        });
    }

    findDocuments(resourceId, callBack) {

        this.connect(function (dbErr, mongoDb) {

            if (!dbErr) {

                var query = {};

                if (resourceId != "") {
                    query = {"employee_id": parseInt(resourceId)};
                }

                mongoDb.collection("employees").find(query).toArray(function(err, result) {
                    if (err) {
                        callBack(err, null);
                    } else {
                        callBack(null, result);
                    }
                });
            }
        });
    }

    updateDocument(resourceId, data, callBack) {

        this.connect(function (dbErr, mongoDb) {

            if (!dbErr) {

                var query = {"employee_id": parseInt(resourceId)};

                data = {$set: data};

                mongoDb.collection("employees").updateOne(query, data, function(err, result) {
                    if (err) {
                        callBack(err, null);
                    } else {
                        callBack(null, result);
                    }
                });
            }
        });
    }

    deleteDocument(resourceId, callBack) {

        this.connect(function (dbErr, mongoDb) {

            if (!dbErr) {

                var query = {"employee_id": parseInt(resourceId)};

                mongoDb.collection("employees").deleteOne(query, function(err, result) {
                    if (err) {
                        callBack(err, null);
                    } else {
                        callBack(null, result);
                    }
                });
            }
        });
    }
}

module.exports = MongoDatabase;