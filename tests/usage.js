"use strict";
exports.__esModule = true;
var urlparser_1 = require("../urlparser");
console.log(urlparser_1.parseUri('http://google'));
console.log(urlparser_1.parseUri('https://www.google.com'));
console.log(urlparser_1.parseUri('https://www.google.com:123'));
console.log(urlparser_1.parseUri('https:yahoo.com:4000'));
console.log(urlparser_1.parseUri('https://whatis.techtarget.com/search/query?q=URL'));
console.log(urlparser_1.parseUri('http:google.com/test/url?param=blah&blah=test#arr'));
console.log(urlparser_1.parseUri('http:google.com:8000/test/url?param=blah&blah=test%20hmm#arr'));
console.log(urlparser_1.parseUri('http://www.99ride.com'));
console.log(urlparser_1.parseUri('ftp://myname@host.com'));
