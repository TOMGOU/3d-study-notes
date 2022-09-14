# GuiControls

> 开发过程对参数的调试很麻烦，需要借助于 guiControls 调试具体参数。

> 其本质是一个简单的控制器，可以设置一个参数，然后调用一个函数，这个函数会改变参数的值。

## 例子

```js
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { model } from './Model.js';

/**
 * 创建一个gui对象
 */
const guiControls = {
  envMapIntensity: 0.5,
  transmission: 0.5,
  metalness: 1.0,
  roughness: 0.5,
};
const gui = new GUI();
gui.domElement.style = 'position: absolute; top: 0; right: 0; width: 300px;';
const folder1 = gui.addFolder('外壳');
folder1.open();
folder1.add(guiControls, 'envMapIntensity', 0.0, 1.0).onChange((value) => {
  model.traverse((object) => {
    if (object.type === 'Mesh') {
      if (object.name.slice(0, 2) === '外壳') {
        // eslint-disable-next-line no-param-reassign
        object.material.envMapIntensity = value;
      }
    }
  });
});
folder1.add(guiControls, 'metalness', 0.0, 1.0).onChange((value) => {
  model.traverse((object) => {
    if (object.type === 'Mesh') {
      if (object.name.slice(0, 2) === '外壳') {
        // eslint-disable-next-line no-param-reassign
        object.material.metalness = value;
      }
    }
  });
});
folder1.add(guiControls, 'roughness', 0.0, 1.0).onChange((value) => {
  model.traverse((object) => {
    if (object.type === 'Mesh') {
      if (object.name.slice(0, 2) === '外壳') {
        // eslint-disable-next-line no-param-reassign
        object.material.roughness = value;
      }
    }
  });
});
const folder2 = gui.addFolder('玻璃');
folder2.open();
folder2.add(guiControls, 'transmission', 0.0, 1.0).onChange((value) => {
  model.traverse((object) => {
    if (object.type === 'Mesh') {
      if (object.name.slice(0, 2) === '玻璃') {
        // eslint-disable-next-line no-param-reassign
        object.material.transmission = value;
      }
    }
  });
});

export default guiControls;

```