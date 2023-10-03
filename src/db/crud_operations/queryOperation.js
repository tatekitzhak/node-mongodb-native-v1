const mongoCli = require('../connection.js')

const findTopics = async (category_subcategory_info) => {

    try {
        const client = await mongoCli.connect(function (db) {
            console.log('Find query:', category_subcategory_info)
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

        db = client.db('contxt1')

        const pipe_to_subcategories = [
            {
                $lookup: {
                    from: "subcategories",
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
            {
                $group: {
                  "_id": {
                    _id: "$_id",
                    title: "$title",
                    description: "$description"
                  },
                  "sub_category": { "$push": "$sub_category" }
                }
            }
        ]

        const categories = await db.collection('test_topics3').aggregate(pipe_to_subcategories).toArray();
        return categories;

    } catch (error) {
        console.log("error getCategory:\n", error.message)
        next(error)
        return
    }
}

module.exports = {
    findTopics,
    aggregateFromCategory
}