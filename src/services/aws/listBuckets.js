const fs = require('fs');
const path = require('path');
const { S3Client,  ListBucketsCommand } = require('@aws-sdk/client-s3');
// https://developers.cloudflare.com/r2/examples/aws-sdk-js-v3/
const { env } = require('../../configs/env');

const listBucketsName = async () => {

    const s3Client = new S3Client({
        region: env.aws.REGION,
        // endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: env.aws.ACCESS_KEY_ID,
            secretAccessKey: env.aws.SECRET_ACCESS_KEY
        }
    });

    try {

        // Get the list Buckets Name from the Amazon S3. It is returned as a .
        const listBucketsName = await s3Client.send(new ListBucketsCommand(''))
            .then((data) => {
                console.log('listBucketsName:\n', data.Buckets[0].Name);

                let dir = path.join(__dirname + '../../../static/'),
                    subDir = data.Buckets[0].Name;

                if (!fs.existsSync(dir + subDir)) {
                    fs.mkdirSync(dir + subDir);
                }
                return data;
            })
            .catch((error) => {
                console.log('error listBucketsName:\n', error);
                throw new Error(error.message)
            })
            .finally((a) => {
                console.log('finally listBucketsName:\n', a);
            });

        return listBucketsName
    } catch (error) {
        console.log("Error listBucketsName:\n", error);
        throw new Error(error.message)
    }
    finally {
        // finally.
    }
}

module.exports = {
    listBucketsName
}