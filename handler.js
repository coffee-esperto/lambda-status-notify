'use strict';

const dynamoDb = require('./services/dynamoDb');

module.exports.coffeNotification = async (event) => {
  const payload = {
    message: event.Records[0].body,
    id: event.Records[0].messageId
  };

  await dynamoDb.put(payload);

  return {
    statusCode: 200,
    body: JSON.stringify(payload),
  }
};
