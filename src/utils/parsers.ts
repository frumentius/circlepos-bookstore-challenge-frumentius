export function makeSerializable<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
