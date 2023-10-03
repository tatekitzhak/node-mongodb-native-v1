const { aggregateFromCategory } = require('../../db/crud_operations/queryOperation.js')

const getCategory = async (req, res, next) => {

    try {

        const category = await aggregateFromCategory()
        

        if (category.length) {
            res.status(200).set({ 'status': 'OK' });
            res.set({ 'Content-Type': 'application/json' });
            res.json({ categories: category })
        } else {
            res.status(400).json({ categories: req.url })
        }


    } catch (error) {
        console.log("error getCategory:\n", error.message)
        next(error)
    }
}

module.exports = {
    getCategory
}