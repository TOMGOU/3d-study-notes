# webGL 上下文丢失

## 问题特征

> 网页 3D 部分的背景色是白色，非 3D 部分的 DOM 元素能正常显示。

## 问题报错，原因以及出现的场景

### 问题1：浏览器对 webGL 上下文个数的限制（google: 16）

- 问题报错：`WARNING: Too many active WebGL contexts. Oldest context will be lost.`

- 原因分析：浏览器同时支持的 WebGL context 个数是有限的，默认是16个。当超出时，会丢失之前创建的对象。

- 出现的场景：

  * 通过 `v-if` 方式切换显示隐藏 3D 场景，或者 `v-if` 的判断字段与 3D 场景组件相关

  * 路由页面跳转，但是没有主动销毁 3D 相关对象和内存释放

### 问题2：计算机进入休眠状态，导致 webGL 上下文数据丢失

- 问题报错：

  * `WebGL error CONTEXT_LOST_WEBGL in uniformMatrix4fv([object WebGLUniformLocation, false, [object Float32Array])`

  * `WAENING: WebGL content on the page might have caused the graphics card to reset`

- 原因分析：WebGL使用了计算机的图形硬件，而这部分资源是被操作系统管理，由包括浏览器在内的多个应用程序共享。如果一个程序接管了图形硬件，或者操作系统进入休眠，浏览器就会失去使用这些资源的权力，并导致存储在硬件中的数据丢失。在这种情况下，WebGL绘图上下文就会丢失。

## 解决方案

### 通过 `v-show`, `opcity`, `visibility` 或者离屏渲染等方式频繁切换显示隐藏 3D 场景

### webGL 提供供了两个事件来表示这种情况:

- 上下文丢失时触发: webglcontextlost

- 上下文恢复事件: webglcontextrestored

```js
const gl = renderer.getContext()
gl.canvas.addEventListener(
  'webglcontextlost',
  () => {
    location.reload()
  },
  false
)
```

### 主动销毁 3D 相关对象和内存释放

```js
onBeforeUnmount(() => {
  try {
    scene.clear()
    renderer.dispose()
    group.remove(buildingModel)
    group.remove(buildingModelWire)
    scene.remove(group)
    scene.remove.apply(scene, scene.children)
    renderer.forceContextLoss()
    renderer.content = null
    cancelAnimationFrame(animationID.value)
    const gl = renderer.domElement.getContext('Model')
    gl && gl.getExtension('WEBGL_lose_context').loseContext()
  } catch (e) {
    console.log(e)
  }
})
```

## 总结

> webGL 上下文是一个相对复杂的对象，一旦 webGL 上下文丢失，它就无法再使用，因此必须在丢失事件发生时及时释放所有相关资源并重新创建一个新的 webGL 上下文。所以要时刻关注 webGL 上下文对象并主动释放内存，防止内存泄露和 webGL 上下文丢失。
