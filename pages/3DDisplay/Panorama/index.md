# Panorama 全景图展示

> 第三方插件：https://photo-sphere-viewer.js.org/guide/#install-photo-sphere-viewer

## 第三方插件的使用
  
```html
<div id="photosphere"></div>
```

```js
import { Viewer } from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

const viewer = new Viewer({
  container: document.querySelector('#photosphere'),
  panorama: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
  size: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  defaultZoomLvl: 10,
  navbar: false,
});
viewer.once('ready', () => {
  viewer.animate({
    longitude: Math.PI,
    latitude: '20deg',
    zoom: 50,
    speed: '2rpm',
  });
});
```

## 原理解析

> 原理非常简单：将全景图作为贴图贴到球面上，然后翻转球面，就可以实现全景图的展示。

```js
const scene = new THREE.Scene();
const material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg'),
});
const size = 1000;
const skyBox = new THREE.Mesh(new THREE.SphereBufferGeometry(size, size, size), material);
skyBox.geometry.scale(-1, 1, 1); // 里外两侧的表面翻转
scene.add(skyBox);
```
