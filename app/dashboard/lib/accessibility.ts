// Minimal accessibility helpers used by dashboard enhanced pages

export function getAccessibilityAttributes() {
  return {
    role: "region",
    "aria-live": "polite",
  } as Record<string, string>
}

function ensureLiveRegion() {
  if (typeof document === "undefined") return null
  let el = document.getElementById("devpocket-live") as HTMLElement | null
  if (!el) {
    el = document.createElement("div")
    el.id = "devpocket-live"
    el.setAttribute("aria-live", "polite")
    el.style.position = "absolute"
    el.style.width = "1px"
    el.style.height = "1px"
    el.style.margin = "-1px"
    el.style.border = "0"
    el.style.padding = "0"
    el.style.overflow = "hidden"
    el.style.clip = "rect(0 0 0 0)"
    document.body.appendChild(el)
  }
  return el
}

export const focusFirst = (selector = "input, button, a") => {
  if (typeof document === "undefined") return
  const el = document.querySelector(selector) as HTMLElement | null
  if (el) el.focus()
}

export function useAccessibility() {
  const announce = (msg: string) => {
    if (typeof document === "undefined") return
    const region = ensureLiveRegion()
    if (region) {
      region.textContent = ""
      // Force DOM update
      setTimeout(() => {
        region.textContent = msg
      }, 50)
    }
  }

  const announceSuccess = (msg: string) => announce(`Success: ${msg}`)
  const announceError = (msg: string) => announce(`Error: ${msg}`)

  const focusElement = (selector: string) => {
    if (typeof document === "undefined") return
    const el = document.querySelector(selector) as HTMLElement | null
    if (el) el.focus()
  }

  return { announce, announceSuccess, announceError, focusElement }
}
