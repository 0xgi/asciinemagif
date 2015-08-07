var system = require('system');
var page = require('webpage').create();
var messages = ['Arguments wrong!! Used: ./render.sh <URL>','Fail to load the address', 'Unable access to network'];
var status = {
    success: ['ok','yes','success','successfully', 'congratulation', 200],
    error: ['no', 'accept', 'error', 'fail', 404, 500, 304]
};

function isAcceptArgs() {
    if (system.args.length === 1) {
        return {
            status: true
        }
    } else {
        return {
            status: false,
            msg: messages[0]
        }
    }
}

function isAcceptRequest(url) {
    page.open(url, function(response) {
        if (response === "success") {
            return {
                status: true
            }
        } else {
            return {
                status: false,
                msg: messages[1]
            }
        }
    })
}

// FIXME, METHOD CAN'T GET DATA VALUES
function getData(page) {
    "use strict";
    this.title = page.evaluate(function() {
        return document.title;
    });
    this.body = page.evaluate(function() {
        return document.body;
    });
    this.tags = page.evaluate(function(name, type) {
        if (type == 'All') {
            return document.querySelectorAll(name);
        } else {
            return document.querySelector(name);
        }
    });
}

var url = 'http://github.com';

(function() {
    // TODO Test method
    isAcceptArgs.status = true;

    if (isAcceptArgs.status) {
        if (isAcceptRequest(url).status) { // FIXME
            console.log(isAcceptRequest(url).status);

            console.log(getData(page).title);
        } else {
            console.log(isAcceptRequest.msg);
        }
    } else {
        console.log(isAcceptArgs.msg);
    }
    phantom.exit();
})();