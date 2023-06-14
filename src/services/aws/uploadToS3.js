var uuid = require('node-uuid');

// params
var bucketName = 'node-sdk-sample-' + uuid.v4();

/**
 https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-storage

 https://stackoverflow.com/questions/69424322/aws-sdk-lib-storage-to-stream-json-from-mongodb-to-s3-with-jsonstream-stringify

 https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_lib_storage.html
 https://codesandbox.io/s/pradeep61993-s3-file-upload-nnretv
 https://stackoverflow.com/questions/69884898/how-to-upload-a-stream-to-s3-with-aws-sdk-v3
 https://blog.salvatorecozzubo.com/upload-a-file-in-aws-s3-in-node-js-aede803ac960
 https://github.com/aws/aws-sdk-js-v3/issues/2694

 https://github.com/aws/aws-sdk-js-v3/blob/main/lib/lib-storage/src/Upload.ts
 */