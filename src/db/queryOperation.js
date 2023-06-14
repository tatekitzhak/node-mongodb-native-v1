const mongoCli = require('./connection.js')

const find = async () => {

    try {
        const client = await mongoCli.connect(function (db) {
            console.log('Find query:')
        })

        mongoCli.listDatabases(client)

        db = client.db('convertxt')

        const categories = await db.collection('category').find({}).toArray();
        return categories;

    } catch (error) {
        console.log("error getCategory:\n", error.message)
        next(error)
        return
    }
}

const aggregateFromCategory = async () => {

    try {
        const client = await mongoCli.connect(function (db) {
            console.log('aggregateFromCategory query:')
        })

        mongoCli.listDatabases(client)

        db = client.db('convertxt')

        const pipeline = [
            {
                $lookup: {
                    from: "subcategory",
                    localField: "subcategory_ref_ids",
                    foreignField: "_id",
                    as: "sub_category"
                }
            },
            {
                $unwind: {
                    path: "$sub_category",
                    preserveNullAndEmptyArrays: true
                }
            },
            // {
            //     $group: {
            //       "_id": {
            //         _id: "$_id",
            //         title: "$title",
            //         description: "$description"
            //       },
            //       "sub_category": { "$push": "$sub_category" }
            //     }
            //   }
        ]

        const categories = await db.collection('category').aggregate(pipeline).toArray();
        return categories;

    } catch (error) {
        console.log("error getCategory:\n", error.message)
        next(error)
        return
    }
}

const add = async (req, res, next) => {
    try {
        const client = await mongoCli.connect(function (db) {
            console.log('Find query:')
        })

        await mongoCli.listDatabases(client)

        

        db = client.db('contxt1')
        var adminDb = db.admin();
        const a = await adminDb.validateCollection('abc');
        console.log('a:', a)
        const docs = [
        //    { "_id": 1, "color": "red"},
        //    { "_id": 2, "color": "purple"},
           {  "number": "5"},
           {  "number": "6"}
        ];
     
        // const insertManyresult = await db.collection('abc').insertMany(docs);
        // let ids = insertManyresult.insertedIds;
     
        // console.log(`${insertManyresult.insertedCount} documents were inserted.`);
        // for (let id of Object.values(ids)) {
        //    console.log(`Inserted a document with id ${id}`);
        // }
        
     } catch(e) {
        console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
        let ids = e.result.result.insertedIds;
        for (let id of Object.values(ids)) {
           console.log(`Processed a document with id ${id._id}`);
        }
        console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
       
     }
     next()
}



module.exports = {
    find,
    aggregateFromCategory,
    add
}