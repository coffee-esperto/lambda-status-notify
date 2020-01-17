'use strict';

const slack = require('./services/slack');
const hasura = require('./services/hasura');

module.exports.coffeNotification = async (event) => {
  const payload = {
    hasCoffe: event.event.data.new.event.hasCoffee,
    nodeId: event.event.data.new.node_id
  };

  try {
    let result = await hasura.send(payload.nodeId)

    let message = {
      text: `Não tem café na ${result.data.nodes[0].description} :x:`,
      color: 'danger',
    }

    if (payload.hasCoffe) {
      message.text = `Tem café na ${result.data.nodes[0].description} :coffee:`;
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