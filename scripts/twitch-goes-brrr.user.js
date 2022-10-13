// ==UserScript==
// @name         Twitch Goes Brrr
// @version      0.2
// @description  Makes your butt tingle
// @author       notasuka
// @homepage https://github.com/notasuka/twitch-goes-brrr
// @updateurl https://github.com/notasuka/twitch-goes-brrr/raw/main/scripts/twitch-goes-brrr.user.js
// @downloadurl https://github.com/notasuka/twitch-goes-brrr/raw/main/scripts/twitch-goes-brrr.user.js
// @include http*://twitch.tv/*/
// @include http*://*.twitch.tv/*/
// @include http*://*.twitch.tv
// @include http*://streamelements.com/*/
// @include http*://*.streamelements.com/*/
// @include http*://*.streamelements.com
// @grant GM_addElement
// @grant unsafeWindow
// @copyright MIT
// ==/UserScript==

GM_addElement(document.body, 'script', {
  src: 'https://cdn.jsdelivr.net/npm/buttplug@1.0.17/dist/web/buttplug.min.js',
  type: 'text/javascript'
});

window.addEventListener('load', async function() {
  try {
    await Buttplug.buttplugInit();
    let buttplugClient = new Buttplug.ButtplugClient("Tutorial Client");

    buttplugClient.addListener('deviceadded', async (device) => {
      console.log('Connected devices:');
      buttplugClient.Devices.forEach((device) => {
        console.log('  - '+device.Name);
        device.vibrate(25)
      });
    });
    buttplugClient.addListener('deviceremoved', async (device) => {
      console.log('Connected devices:');
      buttplugClient.Devices.forEach((device) => {
        console.log('  - '+device.Name);
      });
    });

    // use the embeded connector
    const connector = new Buttplug.ButtplugEmbeddedConnectorOptions();
    await buttplugClient.connect(connector);
    await buttplugClient.startScanning();


  } catch (e) {
    console.log(e);
  }
})