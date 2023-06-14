const mongoCli = require('../../db/connection.js')

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

module.exports = {
    find,
    aggregateFromCategory
}