# CSS2DObject + CSS2DRender 的基本使用和问题

> CSS2D 和 CSS3D 标签的好处：点击事件稳定，使用也简单。

### 基本使用

```js
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

const createTag = (object2d: any, type: string, obj: any) => {
  const element = document.createElement('div')
  element.className = 'elementTag'
  element.style.pointerEvents = 'auto'
  element.style.cursor = 'pointer'
  element.style.top = type === 'robot' ? '0px' : '-60px'
  element.innerHTML = `
    <div class="elementContent">
      <h3>${obj.name}</h3>
    </div>
  `
  element.addEventListener('click', () => {
    popupVisible.value = true
    currentItem.value = obj
  })
  const objectCSS2D = new CSS2DObject(element)
  objectCSS2D.position.copy(object2d.position)
  objectCSS2D.scale.set(0.2, 0.2, 0.2)
  return objectCSS2D
}
```

```js
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.left = '0px'
labelRenderer.domElement.style.pointerEvents = 'none'
if (carElement) carElement.appendChild(labelRenderer.domElement)
```

### 问题一：CSS2D 标签如果要添加点击事件，就会与3D场景中滚轮缩放事件冲突

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

### 问题二：CSS2D 标签残影竖线问题

- 避免使用 overflow: hidden 样式，即可修复问题

### 问题三：精灵图有黑色阴影和透明度的问题，CSS2D 是完美的解决方案（参考百度地图和高德地图的地理位置标识）。

```js
import * as THREE from 'three'

const createDock = () => {
  // 初始化geometry
  const geometry = new THREE.BufferGeometry()
  // 类型数组创建顶点数据
  const arr = []
  for (let i = 0; i < 100; i++) {
    arr.push(400 * Math.random() - 200)
    arr.push(5)
    arr.push(400 * Math.random() - 200)
  }
  const vertices = new Float32Array(arr)
  // 创建属性缓冲区对象
  const attribue = new THREE.BufferAttribute(vertices, 3) // 3个为一组，表示一个顶点的xyz坐标
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribue
  // 初始化贴图
  const texture = new THREE.TextureLoader().load('/3D/texture/dock.jpg')
  // const texture = new THREE.TextureLoader().load('/3D/texture/sprite.png')
  const material = new THREE.PointsMaterial({
    transparent: true,
    size: 10,
    map: texture,
    depthTest: true,
    depthWrite: true
  })
  const particles: any = new THREE.Points(geometry, material)
  return particles
}

export { createDock }
```
