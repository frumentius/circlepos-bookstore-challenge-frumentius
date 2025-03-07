export const isArray = (value: unknown) => {
  return Array.isArray(value)
}

export const isObject = (value: unknown) => {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}
