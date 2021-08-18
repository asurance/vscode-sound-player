export function calcValue(pageX: number, element: HTMLElement | null): number {
  if (element) {
    const bound = element.getBoundingClientRect()
    return Math.max(0, Math.min(1, (pageX - bound.left) / bound.width))
  } else {
    return 0
  }
}
