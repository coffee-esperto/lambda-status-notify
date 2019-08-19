const AWS = require('aws-sdk');
require('dotenv/config');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TABLE = process.env.TABLE_DYNAMODB;
const REGION = process.env.REGION;

AWS.config.update({
    region: REGION,
});

const put = (item) => {
    return new Promise((resolve, reject) => {
        dynamoDb.put({
            TableName: TABLE,
            Item: {
                message: {
                    data: item.data,
                    type: item.type
                },
                id: item.id,
            }
        }, (error, data) => {
            if (error) {
                return reject(error);
            }

            return resolve(data);
        });
    });
};

module.exports = {
    put,
};