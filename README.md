# A simple OAuth and Grant API demo

## How to run on localhost

### Prerequisite

- You have an active read access to this public repo
- You have set-up SSH access as documented:
  [Connecting to Github with SSH](https://help.github.com/en/enterprise/2.18/user/github/authenticating-to-github/connecting-to-github-with-ssh)

### Steps

1. Clone the repo to your local folder

2. In the terminal, switch to the folder and install the node packages with npm:

   ```console
   npm install
   ```

3. Replace the credentials in server.js:

   - client ID and client secret from your own BT OAuth app
   - make sure that the re-direct URI http://localhost:3003 is configured in your OAuth app in BT gateway as documented here:
     https://developers.braintreepayments.com/guides/extend/oauth/configuration#creating-an-oauth-application

4. Run the demo app on localhost with nodemon dev server:
   ```console
   npm run dev
   ```
5. Access the demo app in:
   [http://localhost:3003](http://localhost:3003)

6) For the OAuth flow, please use a separate BT gateway account to login (instead of using the same BT account having the OAuth app. Otherwise you get an authorization error when using access token).

7) After the OAuth flow is completed, switch back to the terminal console, and you should see the payment method nonce logged out.
