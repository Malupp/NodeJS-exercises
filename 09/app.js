const { createServer } = require('http');

function createApp() {
  const server = createServer((request, res) => {
    console.log('request received');

    res.statusCode = 200;

    res.setHeader('Content-Type', 'application/json');

    const jsonResponseBody = JSON.stringify({ location: 'Mars' });

    res.end(jsonResponseBody);
  });

  return server;
}

module.exports = createApp;
