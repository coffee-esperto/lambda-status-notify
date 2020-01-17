const fetch = require('node-fetch');
require('dotenv/config');

const send = (nodeId) => {
    const payload = {
        "query": `query getNode {nodes(where: {node_id: {_eq: "${nodeId}"}}) {description}}`
    }

    return fetch(process.env.HASURA_URI, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        },
    }).then(res => res.json()).then(json => json);
}

module.exports = {
    send,
};
