const { downloadSingleFileFromS3BucketByBucketNameAndObjectName } = require('../../services/aws/index');
const { listBucketsName } = require('../../services/aws/listBuckets');
const getObjectsByBucketName = require('../../services/aws/getObjectsByBucketName');
const { createdNewDirectory, writeDataIntoFile } = require('../../services/create_directories');


const readFilesFromAWSS3 = async (req, res, next) => {

    try {
        const bucketResources = await getObjectsByBucketName('convert-text-1');
        const listObjects = {
            bucketName: bucketResources.Name,
            files: bucketResources.Contents
        };

        createdNewDirectory(listObjects.bucketName);
        
        // Download all files (Objects) from bucket and store them into created folder
        for (let i = 0; i < listObjects.files.length; i++) {
            console.log(`listObjects.files[${i}]Key:`, listObjects.files[i].Key)
            const data = await downloadSingleFileFromS3BucketByBucketNameAndObjectName(listObjects.bucketName, listObjects.files[i].Key);
            writeDataIntoFile(data.Body, listObjects.bucketName, listObjects.files[i].Key);

        }

        if (bucketResources) {
            res.status(200).json({ listObjects })
        } else {
            res.status(400).json({ bucketResources })
        }


    } catch (error) {
        console.log("error readFilesFromAWSS3:\n", error.message)
        next(error)
    }
}

module.exports = {
    readFilesFromAWSS3
}