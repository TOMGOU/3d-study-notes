# THREE.sRGBEncoding

> 纹理中包含的颜色信息（.map, .emissiveMap, 和 .specularMap）在glTF中总是使用sRGB颜色空间，而顶点颜色和材质属性（.color, .emissive, .specular） 则使用线性颜色空间。在典型的渲染工作流程中，纹理会被渲染器转换为线性颜色空间，进行光照计算，然后最终输出会被转换回 sRGB 颜色空间并显示在屏幕上。

- 在使用 glTF 的时候将 WebGLRenderer 进行配置：renderer.outputEncoding = THREE.sRGBEncoding;

```js
/**
  * 创建渲染器对象
  */
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0x00ffff, 1);

```

- 当从外部加载纹理（例如，使用 TextureLoader）并将纹理应用到 glTF 模型，则必须给定对应的颜色空间与朝向：

```js
carModel.traverse((object) => {
  if (object.type === 'Mesh') {
    if (object.name === '车标') {
      object.material.map = new THREE.TextureLoader().load('./gltf/Image_0.png');
      object.material.map.encoding = THREE.sRGBEncoding;
      object.material.map.flipY = false;
    }
  }
});
```
