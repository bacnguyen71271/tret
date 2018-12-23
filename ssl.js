const express = require('express');
var serveIndex = require('serve-index');

// Configure & Run the http server
const app = express();
app.use('/.well-known', express.static('.well-known'), serveIndex('.well-known'));

app.listen(2000, () => {
  console.log('HTTP server running on port 80');
});