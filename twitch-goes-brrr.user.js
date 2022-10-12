// ==UserScript==
// @name         Twitch Goes Brrr
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Makes your butt tingle
// @author       Asuka
// @homepage https://github.com/notasuka/twitch-goes-brrr
// @updateurl https://github.com/notasuka/twitch-goes-brrr/raw/main/twitch-goes-brrr.user.js
// @downloadurl https://github.com/notasuka/twitch-goes-brrr/raw/main/twitch-goes-brrr.user.js
// @include http*://twitch.tv/*/
// @include http*://*.twitch.tv/*/
// @include http*://streamelements.com/*/
// @include http*://*.streamelements.com/*/
// ==/UserScript==

const log = (str) => {
    console.log(`[Asuka Buttplug]: ${str}`);
};

const tipReceived = (amount) => {
    log(amount);
};

window.addEventListener('load', async () => {
    (function () {
        WebSocket.prototype._send = WebSocket.prototype.send;
        WebSocket.prototype.send = function (data) {
            this._send(data);
            this.addEventListener('message', function (msg) {
                log(msg.data);
            }, false);
            this.send = function (data) {
                this._send(data);
                log(data);
            };
            log(data);
        }
    })()
}, false);
