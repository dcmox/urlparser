export interface IUri {
    scheme: string,
    authority?: string,
    host: string,
    port: number,
    tld: string,
    path: string,
    query?: string,
    fragment?: string,
    request: string,
    valid: boolean
}

export const REGEX_URI = /(https?|s?ftp):\/?\/?([^\/ ]+)\.([a-zA-Z]+):?([0-9]*)?\/?([a-zA-Z0-9/_-~.]*)\??([a-zA-Z0-9-._~:\/\?\[\]@!$&'()\*\+,;=]*)#?([\[\]a-zA-Z0-9-._~:\/\?#\[\]@!$&'()\*\+,;=]*)/gi
export const REGEX_AUTH_URI = /(https?|s?ftp):\/?\/?([a-zA-Z:]*)?@?([^\/ ]+)\.([a-zA-Z]+):?([0-9]*)?\/?([a-zA-Z0-9/_\-~.]*)\??([\[\]a-zA-Z0-9-._~:\/\?\[\]@!$&'()\*\+,;=]*)#?([a-zA-Z0-9-._~:\/\?#\[\]@!$&'()\*\+,;=]*)/gi

export const parseUri = (url: string = ''): IUri => {
    let port: number = 80
    // tslint:disable-next-line: no-bitwise
    if (~url.indexOf('@')) {
        const result = new RegExp(REGEX_AUTH_URI).exec(url) || []
        const [request, scheme, authority, host, tld, portNumber, path, params, fragment] = result
        if (portNumber) { port = parseInt(portNumber, 10) }
        let domain: string | undefined = host
        // tslint:disable-next-line: no-bitwise
        if (!host || ~host.indexOf('..') || host.match(/([^a-zA-Z0-9._\-])/)) { domain = undefined }
        if (!portNumber && scheme && scheme.toLowerCase() === 'https') { port = 443 }
        const uri: IUri = {
            authority,
            fragment,
            host: domain ? domain + '.' + tld : '',
            path,
            port,
            query: params,
            request: url,
            scheme,
            tld,
            valid: request !== '' && scheme !== undefined && domain !== undefined && tld !== undefined,
        }
        return uri
    } else {
        const result = new RegExp(REGEX_URI).exec(url) || []
        const [request, scheme, host, tld, portNumber, path, params, fragment] = result
        let domain: string | undefined = host
        // tslint:disable-next-line: no-bitwise
        if (!host || ~host.indexOf('..') || host.match(/([^a-zA-Z0-9._\-])/)) { domain = undefined }
        if (portNumber) { port = parseInt(portNumber, 10) }
        if (!portNumber && scheme && scheme.toLowerCase() === 'https') { port = 443 }
        const uri: IUri = {
            fragment,
            host: domain ? domain + '.' + tld : '',
            path,
            port,
            query: params,
            request: url,
            scheme,
            tld,
            valid: request !== '' && scheme !== undefined
                && domain !== undefined && tld !== undefined
                && request.length < 2048,
        }
        return uri
    }
}
