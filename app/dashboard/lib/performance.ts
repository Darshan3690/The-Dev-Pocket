// Minimal performance helper and hook

export function measureExecution<T>(fn: () => T) {
  const start = Date.now()
  const result = fn()
  const duration = Date.now() - start
  return { result, duration }
}

export async function measureAsyncFn<T>(fn: () => Promise<T>) {
  const start = Date.now()
  const result = await fn()
  const duration = Date.now() - start
  return { result, duration }
}

export function usePerformanceMonitoring() {
  const timers = new Map<string, number>()

  const startTimer = (id: string) => timers.set(id, Date.now())
  const endTimer = (id: string) => {
    const s = timers.get(id)
    if (!s) return null
    const d = Date.now() - s
    timers.delete(id)
    return d
  }

  const measureAsync = async <T>(label: string, fn: () => Promise<T>, category?: string) => {
    const start = Date.now()
    const res = await fn()
    const duration = Date.now() - start
    // Optionally send metric to analytics here
    return res
  }

  return { startTimer, endTimer, measureAsync }
}
