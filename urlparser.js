"use strict";
exports.__esModule = true;
exports.REGEX_URI = /(https?|s?ftp):\/?\/?([^\/ ]+)\.([a-zA-Z]+):?([0-9]*)?\/?([a-zA-Z0-9/%_-~.]*)\??([a-zA-Z0-9-._~:\/\?\[\]@!$&'()%\*\+,;=]*)#?([\[\]a-zA-Z0-9-._~:\/\?#\[\]@!$&'()%\*\+,;=]*)/gi;
exports.REGEX_AUTH_URI = /(https?|s?ftp):\/?\/?([a-zA-Z:]*)?@?([^\/ ]+)\.([a-zA-Z]+):?([0-9]*)?\/?([a-zA-Z0-9/%_\-~.]*)\??([\[\]a-zA-Z0-9-._~:\/\?\[\]@!$&'()%\*\+,;=]*)#?([a-zA-Z0-9-._~:\/\?#\[\]@!$&'()%\*\+,;=]*)/gi;
exports.parseUri = function (url) {
    if (url === void 0) { url = ''; }
    var port = 80;
    // tslint:disable-next-line: no-bitwise
    if (~url.indexOf('@')) {
        var result = new RegExp(exports.REGEX_AUTH_URI).exec(url) || [];
        var request = result[0], scheme = result[1], authority = result[2], host = result[3], tld = result[4], portNumber = result[5], path = result[6], params = result[7], fragment = result[8];
        if (portNumber) {
            port = parseInt(portNumber, 10);
        }
        var domain = host;
        // tslint:disable-next-line: no-bitwise
        if (!host || ~host.indexOf('..') || host.match(/([^a-zA-Z0-9._\-])/)) {
            domain = undefined;
        }
        if (!portNumber && scheme && scheme.toLowerCase() === 'https') {
            port = 443;
        }
        var uri = {
            authority: authority,
            fragment: fragment,
            host: domain ? domain + '.' + tld : '',
            path: path,
            port: port,
            query: params,
            request: url,
            scheme: scheme,
            tld: tld,
            valid: request !== '' && scheme !== undefined && domain !== undefined && tld !== undefined
        };
        return uri;
    }
    else {
        var result = new RegExp(exports.REGEX_URI).exec(url) || [];
        var request = result[0], scheme = result[1], host = result[2], tld = result[3], portNumber = result[4], path = result[5], params = result[6], fragment = result[7];
        var domain = host;
        // tslint:disable-next-line: no-bitwise
        if (!host || ~host.indexOf('..') || host.match(/([^a-zA-Z0-9._\-])/)) {
            domain = undefined;
        }
        if (portNumber) {
            port = parseInt(portNumber, 10);
        }
        if (!portNumber && scheme && scheme.toLowerCase() === 'https') {
            port = 443;
        }
        var uri = {
            fragment: fragment,
            host: domain ? domain + '.' + tld : '',
            path: path,
            port: port,
            query: params,
            request: url,
            scheme: scheme,
            tld: tld,
            valid: request !== '' && scheme !== undefined
                && domain !== undefined && tld !== undefined
                && request.length < 2048
        };
        return uri;
    }
};
