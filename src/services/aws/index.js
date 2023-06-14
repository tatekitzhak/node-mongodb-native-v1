const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
// https://developers.cloudflare.com/r2/examples/aws-sdk-js-v3/
const { env } = require('../../configs/env');

const downloadSingleFileFromS3BucketByBucketNameAndObjectName = async (BucketName, ObjectName) => {
    
    const s3Client = new S3Client({
        region: env.aws.REGION,
        // endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: env.aws.ACCESS_KEY_ID,
            secretAccessKey: env.aws.SECRET_ACCESS_KEY
        }
    });

    // // Get a specific File From S3 Bucket By Bucket Name And Object Nam 
    try {
        // Get the object from the Amazon S3 bucket. It is returned as a ReadableStream.
        const data = await s3Client.send(
                new GetObjectCommand({
                    Bucket: BucketName, // BucketNameHere
                    Key: ObjectName, // ObjectNameHere
                })
            )
            .then( (data) => {
                
                return data
            })
            .catch((error) => {
                console.log("Error ReadableStream:\n", error);
                throw new Error(error.message)
            })
            .finally(() => {
                // finally.
            });
            console.log(data)
        return data;

    } catch (error) {
        console.log("Error downloadSingleFileFromS3BucketByBucketNameAndObjectName:\n", error);
        throw new Error(error.message)
    }
    finally {
        // finally.
    }
}

module.exports = {
    downloadSingleFileFromS3BucketByBucketNameAndObjectName
}