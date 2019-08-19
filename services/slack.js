const fetch = require('node-fetch');
require('dotenv/config');

const send = (body) => {
    return fetch(process.env.CHANNEL_SLACK, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
}

module.exports = {
    send,
};