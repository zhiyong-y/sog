// 各浏览器前缀
const prefixes = ['webkit', 'moz', 'ms', 'o']

let requestAnimationFrame
let cancelAnimationFrame

const isWindow = typeof window === 'undefined'
if (isWindow) {
  // 当前环境无法使用requestAnimationFrame
  requestAnimationFrame = () => { }
  cancelAnimationFrame = () => { }
} else {
  // 默认获取window的requestAnimationFrame
  requestAnimationFrame = window.requestAnimationFrame
  cancelAnimationFrame = window.cancelAnimationFrame

  // 针对不同浏览器内核
  prefixes.forEach((item, index) => {
    // 如果已经从window中获取requestAnimationFrame则不进行操作
    if (!(requestAnimationFrame && cancelAnimationFrame)) {
      requestAnimationFrame = requestAnimationFrame || window[item + 'RequestAnimationFrame']
      cancelAnimationFrame = cancelAnimationFrame || window[item + 'CancelAnimationFrame'] || window[item + 'CancelRequestAnimationFrame']
    }
  })

  // 需要针对iOS6做处理
  // 浏览器不支持requestAnimationFrame则回退到setTimeout
  // 优雅降级
  if (/iP(ad|hone|od).*OS6/.test(window.navigator.userAgent) || !requestAnimationFrame || !cancelAnimationFrame) {
    let lastTime = 0
    requestAnimationFrame = callback => {
      const now = Date.now()
      const nextTime = Math.max(lastTime + 16, now)
      const id = setTimeout(function () {
        callback(lastTime = nextTime)
      }, nextTime - now)
      return id
    }

    cancelAnimationFrame = id => clearTimeout(id)
  }
}

export { requestAnimationFrame, cancelAnimationFrame }
