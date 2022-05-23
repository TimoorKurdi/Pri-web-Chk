window.addEventListener("load", onLoaded);

async function onLoaded() {
  const clientSession = await fetch('https://api.sandbox.primer.io/client-session', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Api-Version': '2021-10-19',
      'X-Api-Key': "f54ed1a9-3f89-4608-a61f-7a05eab89f28",
    },body: JSON.stringify({orderId: 'sds', amount: 11, currencyCode: 'EUR'}),
  }).then(data => data.json())

  const { clientToken } = clientSession

  const universalCheckout = await Primer.showUniversalCheckout(clientToken, {
    container: '#checkout-container',

    onCheckoutComplete({ payment }) {
      console.log('Checkout Complete!', payment)
    },

  })
}