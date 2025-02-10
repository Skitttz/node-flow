export function extractQueryParams(query: string): Record<string, string> {
  return query
    .slice(1) 
    .split("&") 
    .reduce<Record<string, string>>((params, pair) => {
      const [key, value] = pair.split("=");
      if (key && value) params[key] = decodeURIComponent(value);
      return params;
    }, {});
}
