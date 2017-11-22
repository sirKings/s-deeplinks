This is a blank Ionic2 application to test integration with branch.io.

To test in a browser: ionic cordova run browser

# Functionality

Step 1:

* App shows payload input field and submit button.
* User enters payload text and submits.
* App calls: url = make_deeplink_url(payload) <<< deliverable, see home.ts
* App shows and logs the URL
* User shares the URL with another user

Step 2:

* Another user receives the URL and opens it on a mobile device
* If application is not installed on the mobile device, app store page opens
* If application is installed on the mobile device, it starts
* App calls: text = get_deeplink_payload() <<< deliverable, see home.ts
* App shows text saying: "Received Deeplink Payload: {{text}}"

The last step is expected to work correctly in following cases:

* App is freshly installed from referral URL: get_deeplink_payload() returns payload text
* App is launched via referral URL: get_deeplink_payload() returns text from that URL
* App is manually launched: get_deeplink_payload() returns nothing

For deeplink to be resolved correctly in case of fresh install app needs to be deployed in real appstores.
