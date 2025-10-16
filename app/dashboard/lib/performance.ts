// Minimal performance helper

export function measureExecution<T>(fn: () => T) {
  const start = Date.now()
  const result = fn()
  const duration = Date.now() - start
  // optionally send to analytics here
  return { result, duration }
}

export async function measureAsync<T>(fn: () => Promise<T>) {
  const start = Date.now()
  const result = await fn()
  const duration = Date.now() - start
  return { result, duration }
}
