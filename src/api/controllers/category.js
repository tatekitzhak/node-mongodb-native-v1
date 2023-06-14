const {find, aggregateFromCategory} = require('../../services/crud_operations/queryOperation.js')

const getCategory = async (req, res, next) => {

    try {

        const category = await aggregateFromCategory()

        if (category.length) {
            res.status(200).json( category )
        } else {
            res.status(400).json({ topics: req.url })
        }


    } catch (error) {
        console.log("error getCategory:\n", error.message)
        next(error)
    }
}

module.exports = {
    getCategory
}