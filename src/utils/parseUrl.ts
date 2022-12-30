export function parseUrl(path: string, match: string): [boolean, { [x: string]: string }] {
  const matchParts = match.match(/\/[^\/]+/g) || ([] as string[]);
  const pathParts = path.match(/\/[^\/]+/g) || ([] as string[]);

  if (matchParts.length != pathParts.length) {
    return [false, {}];
  }

  let params = {};

  for (let i = 0; i < matchParts.length; i++) {
    if (matchParts[i].charAt(1) == ":") {
      params[matchParts[i].slice(2)] = pathParts[i].slice(1);
      continue;
    }
    if (matchParts[i] != pathParts[i]) {
      return [false, params];
    }
  }

  return [true, params];
}
