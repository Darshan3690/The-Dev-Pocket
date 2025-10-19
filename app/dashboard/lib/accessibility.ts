// Minimal accessibility helpers used by dashboard enhanced pages

export function getAccessibilityAttributes() {
  return {
    role: "region",
    "aria-live": "polite",
  } as Record<string, string>
}

export const focusFirst = (selector = "input, button, a") => {
  if (typeof document === "undefined") return
  const el = document.querySelector(selector) as HTMLElement | null
  if (el) el.focus()
}
