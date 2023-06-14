'use strict'; // eslint-disable-line strict

const { readWriteFilesLocalDirectory } = require('../../services/read_write_files_local_directory');

const readWriteFiles = (req, res, next) => {
    

    async function getContent(content) {
        if (!content.length) {
            console.log('Missing categories data')
            throw new Error('Missing categories data');
        }
        // await createCategoriesAndSubcategoriesCollections(topics);
        // const categories = await getCategories()

        if (content.length) {
            res.status(200).json(content);
        } else {
            res.status(400).json('Empty');
        }
        
    }
    readWriteFilesLocalDirectory(getContent)  
};

module.exports = { readWriteFiles };