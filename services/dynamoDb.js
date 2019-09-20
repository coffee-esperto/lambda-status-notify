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
        if (item.data.location === undefined) {
            return reject(error);
        }

        dynamoDb.put({
            TableName: TABLE,
            Item: {
                id: item.id,
                location: item.data.location,
                message: {
                    data: item.data,
                    type: item.type
                }
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