// Minimal error handling helpers and hook

export function captureError(err: unknown, context?: Record<string, unknown>) {
  console.error("Captured error:", err, context)
}

export function useErrorHandling() {
  const handleError = (err: unknown, level: string | undefined = 'error', context?: string | Record<string, unknown>) => {
    // integrate with external reporting here
    captureError(err, { level, context })
  }

  const wrapAsync = <T extends Array<unknown>, R>(fn: (...args: T) => Promise<R>, ctx?: string) => {
    return async (...args: T): Promise<R | null> => {
      try {
        return await fn(...args)
      } catch (err) {
        handleError(err, 'error', ctx ?? { args })
        return null
      }
    }
  }

  return { handleError, wrapAsync }
}
