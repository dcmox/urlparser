import assert from 'assert'
import sinon from 'sinon'
import { parseUri } from '../urlparser'

describe('url parser', () => {
    it('should detect invalid urls', () => {
        const urls: string[] = [
            'http://google',
            'http:googlecom',
            'http://google/test',
            'http://google .com',
            'http://...com',
            'http://^.com',
            'http://w.ww##.com',
        ]
        urls.forEach((url) => {
            const result = parseUri(url)
            assert.equal(result.valid, false, url)
        })
    })
    it('should detect valid urls', () => {
        const urls: string[] = [
            'http://www.google.com',
            'http://www.google.com/test?q=blah&r=blah2&s=_-test~#hashtag',
            'http:google.com/',
            'ftp://user:password@domain.com',
            'sftp://user:pass@domain.com/blah_blah',
            'https://www.99-ride.com',
            'https://www.yahoo.com:4000/test%20blah',
            'https://www.yahoo.com/test[]=1',
            'https://www.yahoo.com/?test[]=1:2&3@+5&blah=true',
        ]
        urls.forEach((url) => {
            const result = parseUri(url)
            assert.equal(result.valid, true, url)
        })
    })
    it('should return all the parts of a URL', () => {
        const url = 'https://user:password@www.google.com:443/test/url?q[]=blah+blah2&r=@blah2&s=_-test~#hash.tag'
        const expected = {
            authority: 'user:password',
            fragment: 'hash.tag',
            host: 'www.google.com',
            path: 'test/url',
            port: 443,
            query: 'q[]=blah+blah2&r=@blah2&s=_-test~',
            request: 'https://user:password@www.google.com:443/test/url?q[]=blah+blah2&r=@blah2&s=_-test~#hash.tag',
            scheme: 'https',
            tld: 'com',
            valid: true,
        }
        assert.deepEqual(parseUri(url), expected)
    })
})
