# urlparser
Parses HTTP(S) and (S)FTP URLs. Not sure why I bothered crafting my own REGEX to try and handle nearly all URL conditions but I did.

## Usage
```typescript
import { parseUri } from '../urlparser'
console.log(parseUri('https://user:password@www.google.com:8000/test/url?param=blah&blah[]=test#hash.tag'))
```

Returns:
```
{
    "authority": "user:password",
    "fragment": "hash.tag",
    "host": "www.google.com",
    "path": "test/url",
    "port": 8000,
    "query": "param=blah&blah[]=test#arr",
    "request": "https://user:password@www.google.com:8000/test/url?param=blah&blah[]=test#hash.tag",
    "scheme": "https",
    "tld": "com",
    "valid": true,
}
```

## Bugs
Feel free to report bugs :)