'use strict';

const dynamoDb = require('./services/dynamoDb');
const slack = require('./services/slack');

module.exports.coffeNotification = async (event) => {
  const payload = {
    ...JSON.parse(event.Records[0].Sns.Message),
    id: event.Records[0].Sns.MessageId,
  };
  
  try {
    await dynamoDb.put(payload);

    let message = {
      text: `Não tem café na ${payload.data.location} :x:`,
      color: 'danger',
    }

    if (payload.data.hasCoffee) {
      message.text = `Tem café na ${payload.data.location} :coffee:`;
      message.color = 'good';
    }

    await slack.send(message);
  } catch (error) {
    return {
      statusCode: 422,
      error: error,
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(payload),
  }
};