const fetch = require('node-fetch');
require('dotenv/config');

const send = (body) => {
  return fetch(process.env.WEBHOOK, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.status)
}

module.exports = {
  send,
};