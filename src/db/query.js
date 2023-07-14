const { ObjectId } = require('mongodb')
const mongoCli = require('./connection.js')


class DatabaseQuery {
    constructor(props) {
        this.properties = props
    }

    Authenticate = async (doc) => {
        try {

            console.log('Authenticate:', this.properties, doc)
            return
        } catch (error) {
            console.log("Unable to parse the request:", error)
            return
        }
    };

    validateCollection = async (adminDb, collName) => {

        const validateCollection = await adminDb.validateCollection(collName);
        console.log('validateCollection:', validateCollection)

        return validateCollection

    };

    Customer = (req, res, next) => {
        this.Authenticate(req, res, next, "customer");
    };

    Admin = (req, res, next) => {
        this.Authenticate(req, res, next, "admin");
    };

    update = (req, res, next) => {
        this.Authenticate(req, res, next, "admin");
    };

    read = async (req, res, next) => {

        try {

            const client = await mongoCli.connect(function (db) {
                console.log('Find query:')
            });

            const db = await client.db('convertxt')
            var adminDb = await db.admin();
            const status = await adminDb.serverStatus();
            // console.log('adminDb.serverStatus():', status.connections)

            const collectionIsValid = await this.validateCollection(adminDb, 'category');

            // console.log('collectionIsValid:', collectionIsValid.valid)

            try {
                
                var cursor = await db.collection('category').find().toArray();

                return cursor;

            } catch (e) {

                console.log(`read:`, e);

                return;
            }

        } catch (error) {
            console.log("Unable to validateCollection:", error)
            return
        }

    };

    add = async (dbName, collName, doc) => {

        try {
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2),
                month = ("0" + (date_ob.getMonth() + 1)).slice(-2),
                year = date_ob.getFullYear(),
                hours = date_ob.getHours(),
                minutes = date_ob.getMinutes(),
                seconds = date_ob.getSeconds();


            let dateFormat = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

            const client = await mongoCli.connect(function (db) {
                console.log('Find query:')
            });

            const db = await client.db(dbName)
            var adminDb = await db.admin();
            const status = await adminDb.serverStatus();
            // console.log('status:', status.connections)

            const collectionIsValid = await this.validateCollection(adminDb, collName);

            console.log('collectionIsValid:', collectionIsValid.valid)

            try {


                await doc.forEach(async function (element, index, array) {
                    const subcategory_ref = [];
                    // console.log(`category ${index} : ${element.category}`);


                    for await (let key of element.subcategories) {
                        // console.log(`subcategory: ${key}`)
                        console.log(`category ${index} : ${element.category}`);
                        const subcategory = {
                            name: key,
                            description: '',
                            topic_ref_ids: [],
                            tags: [],
                            thumbnail: '',
                            images: '',
                            created_at: dateFormat,
                            updated_at: dateFormat
                        }

                        const insertOneResult = await db.collection('subcategories').insertOne(subcategory);
                        let subcategory_id = insertOneResult.insertedId;
                        subcategory_ref.push(new ObjectId(subcategory_id))
                        console.log(`Inserted id ${subcategory_id}`, subcategory_ref);

                    }
                    // Insert to category
                    const category = {
                        name: element.category,
                        description: '',
                        tags: [],
                        subcategory_ref_ids: subcategory_ref,
                        created_at: dateFormat,
                        updated_at: dateFormat
                    }

                    const insertOneResult = await db.collection(collName).insertOne(category);
                    let category_id = insertOneResult.insertedId;
                    console.log(`Inserted a document with id ${new ObjectId(category_id)}`);

                });



            } catch (e) {

                // console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
                // let ids = e.result.result.insertedIds;
                // for (let id of Object.values(ids)) {
                //     console.log(`Processed a document with id ${id._id}`);
                // }
                // console.log(`Number of documents inserted: ${e.result.result.nInserted}`);

                return;
            }


            return
        } catch (error) {
            console.log("Unable to validateCollection:", error)
            return
        }

    };
}

class Query {
    constructor(props) {
        this.properties = props
        this._conn = null
    }
    Authenticate = async (req, res, next, role) => {
        try {
            req.role = this.properties;
            console.log('Authenticate:', role)
            next()
        } catch (error) {
            res.status(500).send({
                message: "Unable to parse the request",
            });
        }
    };

    Customer = (req, res, next) => {
        this.Authenticate(req, res, next, "customer");
    };

    Agent = (req, res, next) => {
        this.Authenticate(req, res, next, "agent");
    };

    Admin = (req, res, next) => {
        this.Authenticate(req, res, next, "admin");
    };

    update = (req, res, next) => {
        this.Authenticate(req, res, next, "admin");
    };

    add = (req, res, next) => {
        this.Authenticate(req, res, next, "add");
    };
}

module.exports = new DatabaseQuery('Hello')