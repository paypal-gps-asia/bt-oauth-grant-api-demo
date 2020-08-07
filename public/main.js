// helper function - throw error with a customized message
const _throwError = (err, message) => {
  throw new Error(message);
  console.error(err);
  return false;
};

// fetch Connect URL generated from server
fetch("/oauth")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const connectUrl = data.connectUrl;
    console.log(connectUrl);
    // render BT connect button
    const partner = new BraintreeOAuthConnect({
      connectUrl: connectUrl,
      container: "bt-connect-button", // DOM node, DOM element ID, or jQuery object
    });
  })