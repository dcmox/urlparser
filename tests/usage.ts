import { parseUri } from '../urlparser'

console.log(parseUri('http://google'))
console.log(parseUri('https://www.google.com'))
console.log(parseUri('https://www.google.com:123'))
console.log(parseUri('https:yahoo.com:4000'))
console.log(parseUri('https://whatis.techtarget.com/search/query?q=URL'))
console.log(parseUri('http:google.com/test/url?param=blah&blah=test#arr'))
console.log(parseUri('http:google.com:8000/test/url?param=blah&blah=test%20hmm#arr'))
console.log(parseUri('http://www.99ride.com'))
console.log(parseUri('ftp://myname@host.com'))
