// 封装延迟调用refresh函数，用于防抖
export default function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func(args)
    }, delay)
  }
}
