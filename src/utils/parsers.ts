export function makeSerializable<T>(obj: T | T[]): T {
  return JSON.parse(JSON.stringify(obj))
}
