const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const { env } = require('../../configs/env');

module.exports = async (backetName) => {
   
    try {
        const s3Client = new S3Client({
            region: env.aws.REGION,
            // endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: env.aws.ACCESS_KEY_ID,
                secretAccessKey: env.aws.SECRET_ACCESS_KEY
            }
        });

        const object = await s3Client.send(
            new ListObjectsV2Command({
                Bucket: backetName,
            })
        );

        if (object.Contents) {
            for (const file of object.Contents) {
                if (file.Key) {
                    console.log('file.Key:',file.Key)
                }
            }
        }

        return object;
    } catch (error) {
        console.log('ListObjectsV2Command:', error);
        throw new Error(error.message)
    }
}