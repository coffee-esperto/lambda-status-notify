const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TABLE = 'coffe-status-history';
const REGION = 'sa-east-1';

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