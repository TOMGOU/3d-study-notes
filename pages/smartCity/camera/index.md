# 相机参数设置

> 开发过程中，往往会碰到模型已经加载成功但就是看不到效果，这是因为相机的参数设置不正确。

> 相机参数设置的步骤总结：

- 1.利用包围盒计算模型尺寸

- 2.模糊设置，根据模型尺寸设置相同数量级的参数

- 3.精确设置，利用 OrbitControls 动态调整，同时打印相机的位置。

## 包围盒的使用

> 注意：一定要等模型加载完成再计算包围盒。

```js
  /**
  * 包围盒计算模型大小
  */
  setTimeout(() => {
    const box3 = new THREE.Box3(new THREE.Vector3(-2, -2, -2), new THREE.Vector3(2, 2, 2));     
    box3.expandByObject(model);
    console.log('查看包围盒box3', box3);

    const v2 = new THREE.Vector3()
    box3.getCenter(v2)
    console.log('getCenter', v2);

    const v3 = new THREE.Vector3()
    box3.getSize(v3)
    console.log('查看返回的包围盒尺寸', v3);
  }, 3000)
```

## 相机设置

```js
  /**
  * 相机设置
  */
  const width = window.innerWidth; // 窗口宽度
  const height = window.innerHeight; // 窗口高度
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 30000);
  const E = 121.49526536464691; //东方明珠经纬度坐标
  const N = 31.24189350905988;
  const xy = lon2xy(E, N);
  const x = xy.x;
  const y = xy.y;
  // camera.position.set(292, 223, 185);// 相机在Three.js三维坐标系中的位置
  // camera.lookAt(0, 0, 0);// 相机指向Three.js坐标系原点
  // camera.position.set(x + 5000, y + 5000, 5000);// 5000是根据建筑物尺寸范围设置  数量级对应即可 具体数值不用精准
  camera.position.set(13524797, 3662134, 1220);//利用OrbitControls重新设置相机参数 调整视角
  camera.lookAt(x, y, 0);
```