// ==UserScript==
// @name         Twitch Goes Brrr
// @version      0.1
// @description  Makes your butt tingle
// @author       notasuka
// @homepage https://github.com/notasuka/twitch-goes-brrr
// @updateurl https://github.com/notasuka/twitch-goes-brrr/raw/main/twitch-goes-brrr.user.js
// @downloadurl https://github.com/notasuka/twitch-goes-brrr/raw/main/twitch-goes-brrr.user.js
// @include http*://twitch.tv/*/
// @include http*://*.twitch.tv/*/
// @include http*://*.twitch.tv
// @include http*://streamelements.com/*/
// @include http*://*.streamelements.com/*/
// @include http*://*.streamelements.com
// @require https://cdn.jsdelivr.net/npm/buttplug@0.12.2/dist/web/buttplug.min.js
// @require https://raw.githubusercontent.com/buttplugio/buttplug-tampermonkey/master/utils/buttplug-tampermonkey-ui.js
// @copyright MIT
// ==/UserScript==

function newTipsOccurred(tips) {
    console.log('Received new tips');
    console.log(tips);
}
function log(str) {
    console.log(`[Asuka Buttplug]: ${str}`);
};
function tipReceived(amount) {
    log(amount);
};

window.addEventListener('load', async function() {
    (function() {
      let chatbox = $('.chat-box')[0];
      let lastTipCount = 0;
      chatbox.addEventListener('DOMNodeInserted', async function(event){
        let tips = Array
            .apply(null, $('.chat-box span.emoticonImage')
                   .closest('div:not([data-nick]):has(span[style])'))
            .filter(x => x.querySelector('span.emoticonImage').innerHTML.match(/tipped \d+ token(s)?/))
            .map(x => {
              return {
                donation: x.firstChild.innerHTML,
                amount: parseInt(x.lastChild.innerHTML.match(/tipped (\d+) token(s)?/)[1])
              };
            });
        let newTips = tips.slice(lastTipCount);
        lastTipCount = tips.length;
        if (newTips.length) {
          newTipsOccurred(newTips);
          // window.buttplug_devices is defined in the buttplug-tampermonkey-ui.js
          // file, and contains a list of all devices we've added. This is a
          // Buttplug.ButtplugClientDevice object, API is at
          // https://buttplug-js.docs.buttplug.io/classes/buttplugclientdevice.html
          for (const device of window.buttplug_devices) {
            if (device.AllowedMessages.includes("VibrateCmd")) {
              await window.buttplug_devices[0].SendVibrateCmd(1.0);
              setTimeout(() => window.buttplug_devices[0].SendVibrateCmd(0), newTips[0].amount * 100);
            }
          }
        }
      });
    })();
  }, false);