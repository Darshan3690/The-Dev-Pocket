// Minimal error handling helpers

export function captureError(err: unknown, context?: Record<string, unknown>) {
  // No-op placeholder: in production you would send this to Sentry/LogRocket/etc.
  // eslint-disable-next-line no-console
  console.error("Captured error:", err, context)
}

export function wrapAsync<T extends Array<unknown>, R>(fn: (...args: T) => Promise<R>) {
  return async (...args: T): Promise<R | null> => {
    try {
      return await fn(...args)
    } catch (err) {
      captureError(err, { args })
      return null
    }
  }
}
