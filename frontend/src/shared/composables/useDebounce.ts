import { ref, onUnmounted } from 'vue'

export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutId = ref<number | null>(null)

  const debouncedFn = (...args: Parameters<T>) => {
    if (timeoutId.value) {
      window.clearTimeout(timeoutId.value)
    }

    timeoutId.value = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }

  onUnmounted(() => {
    if (timeoutId.value) {
      window.clearTimeout(timeoutId.value)
    }
  })

  return debouncedFn
}
