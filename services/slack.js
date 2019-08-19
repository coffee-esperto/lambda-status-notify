const fetch = require('node-fetch');

const send = (body) => {
    return fetch('https://hooks.slack.com/services/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', {
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