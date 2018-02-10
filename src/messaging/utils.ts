
export function parseURL(url: string, document: Document): string[] {
  const a = document.createElement('a');
  a.href = url;
  let port = "";
  // IE11 always returns port while other only return port if it's not 80 or 443.
  if ( a.port !== "80" && a.port !== "443" ) {
    port = a.port
  }
  return [a.protocol, a.hostname, port, a.pathname];
}

export function buildURL(protocol: string, hostname: string, port?: string, pathname?: string): string {
  port = !!port ? `:${port}`: '';
  pathname = !!pathname ? pathname : '';
  return `${protocol}//${hostname}${port}${pathname}`;
}

export function getOrigin(loc: any): string {
  if(!loc) { return ''; }
  if(!loc.origin) {
    return loc.protocol + "//" + loc.hostname + (loc.port ? ':' + loc.port: '');
  }
  return loc.origin;
}

export const originFromURL = (document: Document) => (url: string): string => {
  if (!url) { return ''; }
  let [ protocol, domain, port ] = parseURL(url, document);
  return buildURL(protocol, domain, port);
};

export const isString = (value: any): boolean => typeof value === 'string';
