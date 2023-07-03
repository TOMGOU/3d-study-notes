# stats 性能监听

> 随着模型的增大，网页无法承载大型模型的加载，需要实时监听网页运行的性能指标。

## 用法

```js
  import Stats from 'three/examples/jsm/libs/stats.module.js'

  const stats = new Stats()
  if (carElement) carElement.appendChild(stats.dom)

  const render = () => {
    // scene.rotateY(0.0005)
    renderer.render(scene, camera) // 执行渲染操作
    moveCamera()
    camera.lookAt(scene.position)
    stats.update()
    // console.log(camera.position)
    requestAnimationFrame(render) // 请求再次执行渲染函数render，渲染下一帧
  }
```

## 性能指标说明

- 帧数（FPS）：图形处理器每秒钟能够刷新几次，通常用FPS（Frames Per Second）来表示，越高的数字越好。

- 毫秒(MS)：渲染一个帧所需的 MS 毫秒，数字越小越好.

- MB ：已分配内存的 MB 字节（占用的内存大小）
