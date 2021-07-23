export function _firstUpperCase(str: string): string {
  return str.replace(/\b(\w)/g, function ($1: string) {
    return $1.toUpperCase();
  });
}
