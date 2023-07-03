# 相机漫游与物体追踪

> 日常开发过程中，我们经常会碰到相机漫游和驱使某个模型按照特定的路线移动的场景，而 `curve.getSpacedPoints` 能将曲线划分为多段生成一个数组，然后将相机的位置和模型的位置按照这个数组的数据依次变化。

## 曲线切段

```js
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(100, -50, 200),
    new THREE.Vector3(50, -50, -100),
    new THREE.Vector3(-300, -50, -200)
])

const points = curve.getSpacedPoints(3000)
```

## 移动相机和3D模型的位置

```js
  // 三维样条曲线
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(100, -50, 200),
    new THREE.Vector3(50, -50, -100),
    new THREE.Vector3(-300, -50, -200)
  ])
  //曲线上等间距返回多个顶点坐标

  let time = 0
  function moveCamera() {
    // 把曲线分割成2999段， 可以得到3000个点
    const points = curve.getSpacedPoints(3000)
    // console.log({ points })
    // 更新取点索引
    time += 3
    // 相机所在点索引
    const index1 = time % 3000
    // 前方机器人所在位置点的索引
    const index2 = (time + 50) % 3000
    // 根据索引取点
    let point = points[index1]
    let point1 = points[index2]
    // 修改相机和模型位置
    // console.log({ point })
    if (point && point.x) {
      if (robot1) {
        robot1.position.set(point1.x, point1.y, point1.z)
        // robot1.lookAt(point.x, point.y, point.z)
      }
      camera.position.set(point.x, point.y, point.z)
      camera.lookAt(point1.x, point1.y, point1.z)
    }
  }
```

## 在 `render` 中调用 `moveCamera` 方法

```js
  const render = () => {
    // scene.rotateY(0.0005)
    renderer.render(scene, camera) // 执行渲染操作
    moveCamera()
    camera.lookAt(scene.position)
    // console.log(camera.position)
    requestAnimationFrame(render) // 请求再次执行渲染函数render，渲染下一帧
  }
```
