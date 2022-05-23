const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();

const staticDir = path.join(__dirname, 'static');
const checkoutPage = path.join(__dirname, 'static', 'checkout.html');

app.use(bodyParser.json());
app.use('/static', express.static(staticDir));

app.get('/', (req, res) => {
  return res.sendFile(checkoutPage);
});

const PRIMER_API_URLS = 'https://api.sandbox.primer.io'

const API_KEY = process.env.API_KEY;
const PRIMER_API_URL = PRIMER_API_URLS[process.env.PRIMER_API_ENVIRONMENT];

app.post('/client-session', async (req, res) => {
  const url = `${PRIMER_API_URL}/client-session`;

  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Version': '2021-10-19',
      'X-Api-Key': 'f54ed1a9-3f89-4608-a61f-7a05eab89f28',
    },
    body: JSON.stringify({orderId: 'sds', amount: 11, currencyCode: 'EUR'}),

  }).then(data => data.json());

  return res.send(response);
});

const PORT = process.env.PORT || 8880;
console.log(`Checkout server listening on port ${PORT}.\nYou can now view the Checkout in a web browser at http://localhost:${PORT}`);
app.listen(PORT);