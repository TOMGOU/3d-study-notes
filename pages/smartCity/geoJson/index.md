# geoJson

> 美术通过**三维建模软件**绘制，可以定制化模型，更加美观。但是如果场景特别多，美术绘制起来很费时，可以使用 geoJson 批量生成模型，然后对个别模型进行替换。

## 三维模型的绘制

1. 美术通过3dmax、blender或其它任何**三维建模软件**绘制，然后导出常见格式，比如gltf，然后程序员使用three.js加载解析即可。

2. 已知物体的几何数据，比如点云、长宽高、轮廓坐标等数据，可以使用**three.js编写代码**，解析已知的几何数据绘制三维模型。

## geoJson 数据转换

### shp 转 GeoJSON

https://mapshaper.org/  一个在线转格式平台

github代码地址：https://github.com/mbloch/mapshaper

文章提到过：https://blog.csdn.net/gisboygogogo/article/details/74056563

### threejs 加载解析 shp 的库 shp.js

github：https://github.com/kig/shp.js/

链接：https://www.bram.us/2012/07/30/shp-js-javascript-shapefile-parser/

## ShapeGeometry

```js
import * as THREE from 'three';

const model = new THREE.Group();

const shape = new THREE.Shape([
  // 一个多边形轮廓的五个顶点坐标
  new THREE.Vector2(0, 0),
  new THREE.Vector2(60, 0),
  new THREE.Vector2(60, 80),
  new THREE.Vector2(40, 120),
  new THREE.Vector2(-20, 80),
]);
//ShapeGeometry：填充多边形
const geometry = new THREE.ShapeGeometry(shape);

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side:THREE.DoubleSide,
  // wireframe:true,//查看生成的三角形
}); //材质对象
const mesh = new THREE.Mesh(geometry, material); //网格模型对象

model.add(mesh);

export default model
```

## ExtrudeGeometry

```js
import * as THREE from 'three';

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

const shape1 = new THREE.Shape([
  // 一个多边形轮廓的五个顶点坐标
  new THREE.Vector2(0, 0),
  new THREE.Vector2(60, 0),
  new THREE.Vector2(60, 80),
  new THREE.Vector2(40, 120),
  new THREE.Vector2(-20, 80),
]);

const shape2 = new THREE.Shape([
  new THREE.Vector2(100, 0),
  new THREE.Vector2(160, 0),
  new THREE.Vector2(160, 80),
  new THREE.Vector2(140, 120),
]);

//ShapeGeometry：填充多边形
const geometry = new THREE.ExtrudeGeometry([shape1, shape2], {
  depth: 50, //拉伸高度
  bevelEnabled: false, //无倒角
});


const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  // wireframe:true,//查看生成的三角形
}); //材质对象
const mesh = new THREE.Mesh(geometry, material); //网格模型对象

model.add(mesh); 

export default model
```
