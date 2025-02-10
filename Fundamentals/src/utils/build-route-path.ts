export function buildRoutePath(path: string) {
  const paramRegex = /:([a-zA-Z0-9]+)/g;
  const pathWithParams = path.replace(paramRegex, '(?<$1>[a-z0-9\-_]+)');  
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex;
}
