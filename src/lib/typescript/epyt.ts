/**
 * Casts {@linkcode value} to the type parameter {@linkcode T}. Sort of the
 * reversed syntax of `type` aliases
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function epyt<T>(value: {}): asserts value is typeof value & T {}
