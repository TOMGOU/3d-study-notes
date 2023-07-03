# OrbitControls

> 文档：https://www.wenjiangs.com/doc/pipydiig

> http://events.jianshu.io/p/91165a6c49e4

- 平移：controls.target.set(0, 0, 0)

- 旋转: controls.autoRotate = true + controls.autoRotateSpeed = 2

- 缩放: camera.zoom = 2

- 状态：controls.saveState() + controls.reset()

```js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { renderer, camera } from '../composables/three'

// 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.1
controls.rotateSpeed = 1.5
controls.zoomSpeed = 1.5
controls.panSpeed = 1.5
controls.autoRotate = true
controls.autoRotateSpeed = 2
controls.enableZoom = true

controls.screenSpacePanning = false

controls.minDistance = 1
controls.maxDistance = 100000
// 修改鼠标事件
controls.mouseButtons = {
  LEFT: THREE.MOUSE.PAN,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.ROTATE
}

controls.saveState()

export { controls }
// controls.minZoom = 0.1
// controls.maxZoom = 1
// controls.maxPolarAngle = Math.PI / 2
// controls.minPolarAngle = 0
```