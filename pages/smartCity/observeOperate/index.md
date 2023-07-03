# 监听用户是否正在操作页面

> 大屏开发一般会碰到这样的需求：用户一段时间不操作当前页面后就直接进入自动轮播状态。

```js
import { ref } from 'vue'
import { throttle } from 'lodash'
const isOperating = ref(true)

let timer: any = null

const time = 30000

timer = setTimeout(() => {
  isOperating.value = false
}, time)

const observeOperate = (bool: boolean) => {
  // CSS2D 标签滚轮事件穿透与点击事件的切换
  const CSS2DTags = document.getElementsByClassName('elementTag')
  for (let i = 0; i < CSS2DTags.length; i++) {
    const element = CSS2DTags[i] as HTMLDivElement
    element.style.pointerEvents = bool ? 'none' : 'auto'
  }
  // 监听用户是否正在操作页面
  clearTimeout(timer)
  timer = null
  isOperating.value = true
  timer = setTimeout(() => {
    isOperating.value = false
  }, time)
}

// 事件节流
document.body.onmousedown = throttle(() => {
  observeOperate(false)
}, 1000)
document.body.onwheel = throttle(() => {
  observeOperate(true)
}, 1000)
document.body.onmousemove = throttle(() => {
  observeOperate(false)
}, 1000)

export { isOperating }
```