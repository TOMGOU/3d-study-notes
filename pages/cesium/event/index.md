# 鼠标事件监听

> 类似于 three.js 的 Raycaster 3D 鼠标事件，cesium 也有自己特有的鼠标事件监听器。

## 代码示例

```js
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  handler.setInputAction((movement) => {
    //   获取鼠标的坐标
    const cartesian = viewer.camera.pickEllipsoid(
      movement.endPosition,
      viewer.scene.globe.ellipsoid
    );
    if (cartesian) {
      //   转换成经纬度
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      const longitudeString = Cesium.Math.toDegrees(
        cartographic.longitude
      ).toFixed(5);
      const latitudeString = Cesium.Math.toDegrees(
        cartographic.latitude
      ).toFixed(5);
      const heightString = cartographic.height;
      //   显示经纬度
      console.log(
        `经度：${longitudeString} 纬度：${latitudeString} 高度：${heightString}`
      );
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
```

## 实现步骤

* step-1: 创建一个 `ScreenSpaceEventHandler` 对象，并传入 `viewer.scene.canvas` 作为参数，这将绑定事件处理程序到 `Cesium` 的渲染画布。

* step-2: 使用 `setInputAction` 方法来设置事件处理程序。它接受两个参数：一个回调函数和一个指定事件类型的常量。

```js
  handler.setInputAction((movement) => {
    // 在这里编写处理鼠标移动事件的代码
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
```

* step-3: 编写回调函数，可以通过movement.endPosition获取鼠标当前的屏幕坐标。然后，使用viewer.camera.pickEllipsoid方法将屏幕坐标转换为地球上的笛卡尔坐标。

```js
  const cartesian = viewer.camera.pickEllipsoid(
    movement.endPosition,
    viewer.scene.globe.ellipsoid
  );
```

* step-4: `ScreenSpaceEventType` 常量

姓名	| 描述
-----| ----
LEFT_DOWN	|	表示鼠标左键按下事件。
LEFT_UP	|	代表鼠标左键按下事件。
LEFT_CLICK	|	代表鼠标左键单击事件。
LEFT_DOUBLE_CLICK	|	代表鼠标左键双击事件。
RIGHT_DOWN	|	表示鼠标左键按下事件。
RIGHT_UP	|	代表鼠标右键按下事件。
RIGHT_CLICK	|	代表鼠标右键单击事件。
MIDDLE_DOWN	|	表示鼠标中键按下事件。
MIDDLE_UP	|	代表鼠标中键弹起事件。
MIDDLE_CLICK	|	代表鼠标中键单击事​​件。
MOUSE_MOVE	|	代表鼠标移动事件。
WHEEL	|	代表鼠标滚轮事件。
PINCH_START	|	表示触摸表面上两指事件的开始。
PINCH_END	|	表示触摸表面上的两指事件的结束。
PINCH_MOVE	|	表示触摸表面上两指事件的变化。
