const express = require('express');

// Configure & Run the http server
const app = express();

app.get('.well-known/acme-challenge/5FKx4lpLudCx-qaUcUpRxjmZNoLkNiG-eT4WKUoGt5Q', function (req, res) { res.send('5FKx4lpLudCx-qaUcUpRxjmZNoLkNiG-eT4WKUoGt5Q.zVSWIvmchnx5iyynm0EVIfGQNL-JdW4TlsHPwbtReJA'); });
app.listen(2000, () => {
  console.log('HTTP server running on port 80');
});