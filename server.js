const braintree = require("braintree");
const express = require("express");
const app = express();
const port = process.env.PORT || 3003; // port for Heroku deployment

// build BT connection
const gateway = braintree.connect({
  clientId: "client_id$sandbox$tpf4skvqg4s8gm4k",
  clientSecret: "client_secret$sandbox$fcca370f4795c69c880efdc2a775e2e4",
});

// define the re-direct URI
const redirectUri = "http://localhost:3003";

app.get("/oauth", (req, res) => {
  const url = gateway.oauth.connectUrl({
    redirectUri: redirectUri,
    scope: "grant_payment_method,read_facilitated_transactions",
    state: "foo_state",
  });

  res.send({
    connectUrl: url,
  });
});

app.get('/', (req, res, next) => {

  // generate access and refresh token in case auth code exists in query parameter
  if (req.query.code) {
    gateway.oauth.createTokenFromCode({
      code: req.query.code
    }, (err, response) => {
      if (err) {
        console.log("Generating access token failed!")
        console.error(err)
      } else {
        const accessToken = response.credentials.accessToken;
        const expiresAt = response.credentials.expiresAt;
        const refreshToken = response.credentials.refreshToken;

        // make a grant API call to generate a one-time nonce
        const oauth_gateway = braintree.connect({
          accessToken: accessToken
        });

        // taking an existing payment method token from your vault
        const paymentMethodToken = "c6sdybm"

        oauth_gateway.paymentMethod.grant(
          paymentMethodToken, {
            allow_vaulting: false,
            include_billing_postal_code: false
          },
          (err, grantResult) => {
            if (err) {
              console.log("Grant API failed!")
              console.error(err)
            } else {
              const nonceToSendToRecipient = grantResult.paymentMethodNonce.nonce;
              console.log(nonceToSendToRecipient)
              // ...
            }
          }
        );
      }
    });
  }

  // continue
  next()

})

/*serve static files from the folder /public */
app.use(express.static(__dirname + "/public"));


/* start listening on the port */
app.listen(port, () =>
  console.log(`Braintree demo app is listening on port ${port}!`)
);